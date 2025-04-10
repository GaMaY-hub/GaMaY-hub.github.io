import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
/*import { defineConfig } from "@quartz/config"*/ /* MB: I added this, following instructions */

/** MB: I added these lines to package.json, to get this custom css to work
    nothing added
**/

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
      /* put custom css in the scss file */
      /* customCss: "styles/custom.scss", */

      /* If you removed customCss from your config, Quartz should ignore your custom.scss. However, this project is using a scaffolded Quartz build, 
      likely with a custom pipeline from the starter template I used. In scaffolded (opinionated) Quartz installs, there is an internal pipeline that may
      expect your styles/base.scss to always be valid because your theme.css is not entirely coming from Quartz defaults. 
      even if you remove customCss from your config, your Quartz build is already hardwired to include your custom styles as part of the theme pipeline.
      I am not just adding custom styles, my base.scss is part of the main build in my scaffolded project.
      */

const config: QuartzConfig = {
  configuration: {
    pageTitle: "",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://gamay-hub.github.io/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      customCss: "styles/custom.scss",
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Work Sans", /* MB: prev: Schibsted Grotesk */
        body: "Nunito",  /* MB: prev: Source Sans Pro */
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", /* MB: this was #faf8f8 */
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

/*export default defineConfig(config)*/

