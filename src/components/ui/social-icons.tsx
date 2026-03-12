import type { Icon } from '@phosphor-icons/react';
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react/ssr';

import { SocialPlatform } from '@/config/social';

export const socialIcons: Record<SocialPlatform, Icon> = {
  [SocialPlatform.GitHub]: GithubLogoIcon,
  [SocialPlatform.LinkedIn]: LinkedinLogoIcon,
  [SocialPlatform.Email]: EnvelopeSimpleIcon,
};
