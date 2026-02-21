type SiteConfigProps = {
  author: string;
  color: string;
  socialLinks: string[];
};

export const siteConfig: SiteConfigProps = {
  author: 'Márcio Sobral',
  color: '#ededed',
  socialLinks: [
    'https://github.com/marciosobral',
    'https://linkedin.com/in/marciosobral',
  ],
};

export type SiteConfig = SiteConfigProps;
