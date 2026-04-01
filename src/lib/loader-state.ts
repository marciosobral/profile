let skipNextLoader = false;

export function flagLoaderSkip(): void {
  skipNextLoader = true;
}

export function consumeLoaderSkip(): boolean {
  const value = skipNextLoader;
  skipNextLoader = false;
  return value;
}
