export interface RawMetadata {
  title: string | { default: string; template: string };
  description: string;
  keywords?: string;
  openGraph?: {
    title: string;
    description: string;
    type: string;
  };
  jsonLd?: {
    jobTitle: string;
    description: string;
    knowsAbout: string[];
  };
  noIndex?: boolean;
  noCache?: boolean;
}
