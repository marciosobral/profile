import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

interface ParsedColor {
  rgb: [number, number, number];
  alpha: number;
}

function getBlock(css: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockMatch = css.match(
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

describe('text-soft contrast in light themes', () => {
  it('meets WCAG AA (>= 4.5:1) on light backgrounds', () => {
    const cssPath = resolve(process.cwd(), 'src/app/globals.css');
    const css = readFileSync(cssPath, 'utf8');

    const selectors = [
      "[data-theme='ink'][data-mode='light']",
      "[data-theme='ocean'][data-mode='light']",
    ];

    for (const selector of selectors) {
      const block = getBlock(css, selector);
      const background = parseColor(getVariableValue(block, '--background'));
      const textSoft = parseColor(getVariableValue(block, '--text-soft'));
      const effectiveText = composite(textSoft, background);
      const ratio = contrastRatio(effectiveText, background.rgb);

      expect(ratio).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('uses 70% alpha for --text-soft in light themes', () => {
    const cssPath = resolve(process.cwd(), 'src/app/globals.css');
    const css = readFileSync(cssPath, 'utf8');

    const selectors = [
      "[data-theme='ink'][data-mode='light']",
      "[data-theme='ocean'][data-mode='light']",
    ];

    for (const selector of selectors) {
      const block = getBlock(css, selector);
      const textSoft = parseColor(getVariableValue(block, '--text-soft'));
      expect(textSoft.alpha).toBeCloseTo(0.7, 2);
    }
  });
});
