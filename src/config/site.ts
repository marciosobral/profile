type SiteConfigProps = {
  author: string;
  email: string;
  color: string;
  socialLinks: string[];
};

export const siteConfig: SiteConfigProps = {
  author: 'Márcio Sobral',
  email: 'contato@marciosobral.com.br',
  color: '#ededed',
  socialLinks: [
    'https://github.com/marciosobral',
    'https://linkedin.com/in/marciosobral',
  ],
};

export type SiteConfig = SiteConfigProps;
