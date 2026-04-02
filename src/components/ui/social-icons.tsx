import type { Icon } from '@phosphor-icons/react';
import {
  LinkedinLogoIcon,
  GithubLogoIcon,
  EnvelopeSimpleIcon,
  XLogoIcon,
  InstagramLogoIcon,
  DiscordLogoIcon,
  WhatsappLogoIcon,
  BriefcaseIcon,
  FileTextIcon,
} from '@phosphor-icons/react/ssr';

import { SocialPlatform } from '@/config/social';

export const socialIcons: Record<SocialPlatform, Icon> = {
  [SocialPlatform.GitHub]: GithubLogoIcon,
  [SocialPlatform.LinkedIn]: LinkedinLogoIcon,
  [SocialPlatform.Email]: EnvelopeSimpleIcon,
  [SocialPlatform.X]: XLogoIcon,
  [SocialPlatform.Instagram]: InstagramLogoIcon,
  [SocialPlatform.Discord]: DiscordLogoIcon,
  [SocialPlatform.WhatsApp]: WhatsappLogoIcon,
  [SocialPlatform.Resume]: FileTextIcon,
  [SocialPlatform.Portfolio]: BriefcaseIcon,
};
