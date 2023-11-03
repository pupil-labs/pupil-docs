type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

export interface Outline {
  level?: number | [number, number] | "deep";
  label?: string;
}

type SocialLinkIcon =
  | "discord"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "mastodon"
  | "slack"
  | "twitter"
  | "youtube"
  | { svg: string };

interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
  ariaLabel?: string;
}

// configs
type ConfigProps = {
  head: HeadConfig[];
  appearance: boolean;
  cleanUrls: boolean;
};

type ThemeConfigProps = {
  socialLinks: SocialLink[];
  search:
    | { provider: "local"; options?: any }
    | { provider: "algolia"; options: any };
  outline: Outline | Outline["level"] | false;
};

export const config: ConfigProps = {
  head: [["link", { rel: "icon", href: "./favicon.png" }]],
  appearance: true,
  cleanUrls: true,
};

export const theme_config: ThemeConfigProps = {
  socialLinks: [
    { icon: "discord", link: "https://pupil-labs.com/chat" },
    { icon: "youtube", link: "https://www.youtube.com/c/PupilLabs" },
    { icon: "twitter", link: "https://twitter.com/pupil_labs" },
  ],
  search: {
    provider: "local",
  },
  outline: [2, 3],
};
