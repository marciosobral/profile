let skipNextLoader = false;
let skipNextAnimation = false;

export function flagLoaderSkip(): void {
  skipNextLoader = true;
  skipNextAnimation = true;
}

export function consumeLoaderSkip(): boolean {
  const value = skipNextLoader;
  skipNextLoader = false;
  return value;
}

export function consumeAnimationSkip(): boolean {
  const value = skipNextAnimation;
  skipNextAnimation = false;
  return value;
}
