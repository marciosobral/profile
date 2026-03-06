import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface ParsedColor {
  rgb: [number, number, number];
  alpha: number;
}

interface ThemeBlock {
  selector: string;
  theme: string;
  mode: 'light' | 'dark';
  block: string;
}

const cssPath = resolve(process.cwd(), 'src/app/globals.css');
const css = readFileSync(cssPath, 'utf8');

function getBlock(source: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockMatch = source.match(
    new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`),
  );
  if (!blockMatch) {
    throw new Error(`Could not find selector block: ${selector}`);
  }
  return blockMatch[1];
}

function getVariableValue(block: string, variableName: string) {
  const variableMatch = block.match(new RegExp(`${variableName}:\\s*([^;]+);`));
  if (!variableMatch) {
    throw new Error(`Could not find variable: ${variableName}`);
  }
  return variableMatch[1].trim();
}

function getThemeBlocks(source: string): ThemeBlock[] {
  return [...source.matchAll(/\[data-theme='([^']+)'\]\[data-mode='([^']+)'\]/g)]
    .map((match) => ({
      selector: match[0],
      theme: match[1],
      mode: match[2] as ThemeBlock['mode'],
      block: getBlock(source, match[0]),
    }))
    .filter(
      (block, index, blocks) =>
        blocks.findIndex(({ selector }) => selector === block.selector) === index,
    );
}

function parseColor(value: string): ParsedColor {
  const hexMatch = value.match(/^#([0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    return {
      rgb: [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16),
      ],
      alpha: 1,
    };
  }

  const rgbMatch = value.match(
    /^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*([\d.]+)%?)?\s*\)$/i,
  );
  if (rgbMatch) {
    const alphaValue = rgbMatch[4];
    const alpha = alphaValue
      ? alphaValue.includes('.')
        ? Number.parseFloat(alphaValue)
        : Number.parseFloat(alphaValue) / 100
      : 1;

    return {
      rgb: [
        Number.parseInt(rgbMatch[1], 10),
        Number.parseInt(rgbMatch[2], 10),
        Number.parseInt(rgbMatch[3], 10),
      ],
      alpha,
    };
  }

  throw new Error(`Unsupported color format: ${value}`);
}

function composite(
  foreground: ParsedColor,
  background: ParsedColor,
): [number, number, number] {
  return foreground.rgb.map((channel, index) => {
    return (
      channel * foreground.alpha +
      background.rgb[index] * (1 - foreground.alpha)
    );
  }) as [number, number, number];
}

function srgbToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : Number.parseFloat(((value + 0.055) / 1.055).toString()) ** 2.4;
}

function luminance([red, green, blue]: [number, number, number]) {
  return (
    0.2126 * srgbToLinear(red) +
    0.7152 * srgbToLinear(green) +
    0.0722 * srgbToLinear(blue)
  );
}

function contrastRatio(
  colorA: [number, number, number],
  colorB: [number, number, number],
) {
  const l1 = luminance(colorA);
  const l2 = luminance(colorB);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

function getEffectiveContrast(block: string, variableName: string) {
  const background = parseColor(getVariableValue(block, '--background'));
  const color = parseColor(getVariableValue(block, variableName));
  const effectiveColor = color.alpha === 1 ? color.rgb : composite(color, background);

  return {
    ratio: contrastRatio(effectiveColor, background.rgb),
    alpha: color.alpha,
  };
}

const themeBlocks = getThemeBlocks(css);
const readableTextVariables = ['--foreground', '--text-muted', '--text-soft'];
const expectedAlphaByMode = {
  light: {
    '--text-muted': 0.72,
    '--text-soft': 0.7,
    '--text-faint': 0.42,
  },
  dark: {
    '--text-muted': 0.78,
    '--text-soft': 0.62,
    '--text-faint': 0.45,
  },
} as const;

describe('theme contrast tokens', () => {
  it('keeps readable text tokens at WCAG AA contrast across every theme block', () => {
    for (const { selector, block, theme, mode } of themeBlocks) {
      for (const variableName of readableTextVariables) {
        const { ratio } = getEffectiveContrast(block, variableName);

        expect(ratio, `${selector} ${variableName}`).toBeGreaterThanOrEqual(4.5);
        expect(theme).toBeTruthy();
        expect(mode).toMatch(/^(light|dark)$/);
      }
    }
  });

  it('preserves the intended alpha tiers for muted, soft, and faint text', () => {
    for (const { selector, block, mode } of themeBlocks) {
      const expectedAlpha = expectedAlphaByMode[mode];

      for (const [variableName, alpha] of Object.entries(expectedAlpha)) {
        const { alpha: actualAlpha } = getEffectiveContrast(block, variableName);
        expect(actualAlpha, `${selector} ${variableName}`).toBeCloseTo(alpha, 2);
      }
    }
  });

  it('keeps text contrast ordered from foreground to faint in every theme block', () => {
    for (const { selector, block } of themeBlocks) {
      const foreground = getEffectiveContrast(block, '--foreground').ratio;
      const muted = getEffectiveContrast(block, '--text-muted').ratio;
      const soft = getEffectiveContrast(block, '--text-soft').ratio;
      const faint = getEffectiveContrast(block, '--text-faint').ratio;

      expect(foreground, `${selector} foreground vs muted`).toBeGreaterThan(
        muted,
      );
      expect(muted, `${selector} muted vs soft`).toBeGreaterThan(soft);
      expect(soft, `${selector} soft vs faint`).toBeGreaterThan(faint);
    }
  });
});
