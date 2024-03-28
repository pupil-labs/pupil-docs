type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string];

export interface Outline {
  level?: number | [number, number] | "deep";
  label?: string;
}

export type SocialLinkIcon =
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

export interface SocialLink {
  icon: SocialLinkIcon;
  link: string;
  ariaLabel?: string;
  target?: string;
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
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-YSCHB0T6ML",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-YSCHB0T6ML');",
    ],
  ],
  appearance: true,
  cleanUrls: true,
};

export const theme_config: ThemeConfigProps = {
  socialLinks: [
    { icon: "discord", link: "https://pupil-labs.com/chat" },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm240-120q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm0-160q17 0 28.5-11.5T520-560v-160q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720v160q0 17 11.5 28.5T480-520Z"/></svg>',
      },
      link: "https://discord.com/channels/285728493612957698/1203965124759519252",
    },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Z"/></svg>',
      },
      link: "https://docs.pupil-labs.com/alpha-lab",
      target: "_self",
    },
    {
      icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H600q-17 0-28.5-11.5T560-160v-200q0-17-11.5-28.5T520-400h-80q-17 0-28.5 11.5T400-360v200q0 17-11.5 28.5T360-120H240q-33 0-56.5-23.5T160-200Z"/></svg>',
      },
      link: "https://docs.pupil-labs.com/",
      target: "_self",
    },
  ],
  search: {
    provider: "local",
  },
  outline: [2, 3],
};
