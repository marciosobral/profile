export const themes = ['ink', 'ocean'] as const;
export type Theme = (typeof themes)[number];

export const modes = ['light', 'dark'] as const;
export type Mode = (typeof modes)[number];

export const defaultTheme: Theme = 'ocean';
export const defaultMode: Mode = 'light';
