export interface TransitionOrigin {
  x: number;
  y: number;
}

interface Viewport {
  width: number;
  height: number;
}

export interface RadialRevealState extends TransitionOrigin {
  radius: number;
}

const RADIAL_REVEAL_ATTRIBUTE = 'data-radial-reveal';
const RADIAL_REVEAL_X_VAR = '--radial-reveal-x';
const RADIAL_REVEAL_Y_VAR = '--radial-reveal-y';
const RADIAL_REVEAL_RADIUS_VAR = '--radial-reveal-radius';

export function clampPointToViewport(
  point: TransitionOrigin,
  viewport: Viewport,
): TransitionOrigin {
  return {
    x: Math.min(Math.max(point.x, 0), viewport.width),
    y: Math.min(Math.max(point.y, 0), viewport.height),
  };
}

export function getFarthestViewportCornerDistance(
  point: TransitionOrigin,
  viewport: Viewport,
) {
  const clampedPoint = clampPointToViewport(point, viewport);

  return Math.max(
    Math.hypot(clampedPoint.x, clampedPoint.y),
    Math.hypot(viewport.width - clampedPoint.x, clampedPoint.y),
    Math.hypot(clampedPoint.x, viewport.height - clampedPoint.y),
    Math.hypot(
      viewport.width - clampedPoint.x,
      viewport.height - clampedPoint.y,
    ),
  );
}

function shouldReduceMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function getFallbackOrigin(viewport: Viewport): TransitionOrigin {
  return {
    x: viewport.width / 2,
    y: viewport.height / 2,
  };
}

export function getRadialRevealState(
  origin: TransitionOrigin | undefined,
  viewport: Viewport,
): RadialRevealState {
  const safeOrigin = clampPointToViewport(
    origin ?? getFallbackOrigin(viewport),
    viewport,
  );

  return {
    x: safeOrigin.x,
    y: safeOrigin.y,
    radius: getFarthestViewportCornerDistance(safeOrigin, viewport),
  };
}

function applyRadialRevealState(state: RadialRevealState) {
  const root = document.documentElement;
  root.style.setProperty(RADIAL_REVEAL_X_VAR, `${state.x}px`);
  root.style.setProperty(RADIAL_REVEAL_Y_VAR, `${state.y}px`);
  root.style.setProperty(RADIAL_REVEAL_RADIUS_VAR, `${state.radius}px`);
  root.setAttribute(RADIAL_REVEAL_ATTRIBUTE, 'active');
}

function clearRadialRevealState() {
  const root = document.documentElement;
  root.removeAttribute(RADIAL_REVEAL_ATTRIBUTE);
  root.style.removeProperty(RADIAL_REVEAL_X_VAR);
  root.style.removeProperty(RADIAL_REVEAL_Y_VAR);
  root.style.removeProperty(RADIAL_REVEAL_RADIUS_VAR);
}

export function runRadialRevealTransition(
  apply: () => void,
  origin?: TransitionOrigin,
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    apply();
    return;
  }

  if (shouldReduceMotion()) {
    apply();
    return;
  }

  const viewport: Viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  if (!viewport.width || !viewport.height) {
    apply();
    return;
  }

  if (!('startViewTransition' in document)) {
    apply();
    return;
  }

  applyRadialRevealState(getRadialRevealState(origin, viewport));

  try {
    const viewTransition = document.startViewTransition(() => {
      apply();
    });

    viewTransition.finished.finally(() => {
      clearRadialRevealState();
    });
  } catch {
    clearRadialRevealState();
    apply();
  }
}
