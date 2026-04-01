export enum SocialPlatform {
  GitHub = 'GitHub',
  LinkedIn = 'LinkedIn',
  Email = 'E-mail',
}

export type SocialConfigProps = {
  name: SocialPlatform;
  url: string;
  visibility?: {
    jsonLd?: boolean;
    contactForm?: boolean;
    maintenance?: boolean;
    footer?: boolean;
  };
};

export const socialConfig: SocialConfigProps[] = [
  {
    name: SocialPlatform.GitHub,
    url: 'https://github.com/marciosobral',
    visibility: {
      jsonLd: true,
      contactForm: true,
      maintenance: false,
      footer: true,
    },
  },
  {
    name: SocialPlatform.LinkedIn,
    url: 'https://linkedin.com/in/marciosobral',
    visibility: {
      jsonLd: true,
      contactForm: true,
      maintenance: true,
      footer: true,
    },
  },
  {
    name: SocialPlatform.Email,
    url: 'mailto:contato@marciosobral.net',
    visibility: {
      jsonLd: false,
      contactForm: true,
      maintenance: true,
      footer: true,
    },
  },
];

export type SocialConfig = SocialConfigProps;

type VisibilityContext = keyof NonNullable<SocialConfigProps['visibility']>;

export function getSocialLinks(
  context: VisibilityContext,
): SocialConfigProps[] {
  return socialConfig.filter((s) => s.visibility?.[context]);
}

export function getEmailUrl(): string {
  const email = socialConfig.find((s) => s.name === SocialPlatform.Email);
  return email?.url ?? '';
}
