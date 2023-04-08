<script lang="ts">
  import { setContext } from "svelte";
  import Page from "./page.svelte";
  import PageHeader from "./header.svelte";
  import PageFooter from "./footer.svelte";
  import Category from "./category.svelte";
  import Article from "./article.svelte";
  import { writable } from "svelte/store";
  import type { RETURN_DATA } from "$lib/types";

  export let data: RETURN_DATA;

  const context = writable(data);
  setContext("context", context);

  $: $context = data;
</script>

<PageHeader />

{#if data.type === "page"}
  <Page {data} />
{:else if data.type === "post"}
  <Article {data} />
{:else if data.type === "category"}
  <Category {data} />
{/if}

<PageFooter />

<svelte:head>
  <title>{data.meta.title} | Actualitate.net</title>
  <meta name="description" content={data.meta.description} />
  {#if data.meta.canonical}
    <link rel="canonical" href={data.meta.canonical} />
    <meta property="og:url" content={data.meta.canonical} />
  {/if}

  {#if data.meta.image}
    <meta property="og:image" content={data.meta.image} />
  {/if}

  <meta name="robots" content="max-image-preview:large, max-video-preview:-1" />

  <!-- For old IEs -->
  <link rel="shortcut icon" href="favicon.ico" />

  <!-- For new browsers - multisize ico  -->
  <link rel="icon" type="image/x-icon" sizes="16x16 32x32" href="favicon.ico" />

  <!-- For iPad with high-resolution Retina display running iOS ≥ 7: -->
  <link
    rel="apple-touch-icon"
    sizes="152x152"
    href="favicon-152-precomposed.png"
  />

  <!-- For iPad with high-resolution Retina display running iOS ≤ 6: -->
  <link
    rel="apple-touch-icon"
    sizes="144x144"
    href="favicon-144-precomposed.png"
  />

  <!-- For iPhone with high-resolution Retina display running iOS ≥ 7: -->
  <link
    rel="apple-touch-icon"
    sizes="120x120"
    href="favicon-120-precomposed.png"
  />

  <!-- For iPhone with high-resolution Retina display running iOS ≤ 6: -->
  <link
    rel="apple-touch-icon"
    sizes="114x114"
    href="favicon-114-precomposed.png"
  />

  <!-- For iPhone 6+ -->
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="favicon-180-precomposed.png"
  />

  <!-- For first- and second-generation iPad: -->
  <link
    rel="apple-touch-icon"
    sizes="72x72"
    href="favicon-72-precomposed.png"
  />

  <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
  <link rel="apple-touch-icon" sizes="57x57" href="favicon-57.png" />

  <!-- For Old Chrome -->
  <link rel="icon" sizes="32x32" href="favicon-32.png" />

  <!-- For IE10 Metro -->
  <meta name="msapplication-TileColor" content="#FFFFFF" />
  <meta name="msapplication-TileImage" content="favicon-144.png" />
  <meta name="theme-color" content="#ffffff" />

  <!-- Chrome for Android -->
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" sizes="192x192" href="favicon-192.png" />

  <script defer>
    var klaroConfig = {
      version: 1,
      groupByPurpose: true,
      storageMethod: "localStorage",
      default: true,
      mustConsent: true,
      htmlTexts: true,
      noAutoLoad: false,
      cookieDomain: ".actualitate.net",
      acceptAll: true,
      hideDeclineAll: true,
      hideLearnMore: false,
      lang: "ro",
      disablePoweredBy: true,

      translations: {
        ro: {
          acceptAll: "Acceptã toate",
          acceptSelected: "Doar selectate",
          privacyPolicyUrl:
            "https://actualitate.net/politica-confidentialitate",
          privacyPolicy: {
            text: 'Citeste mai multe informatii in <a href="https://actualitate.net/politica-confidentialitate" target="_blank">politica de confidentialitate</a>.',
          },

          consentModal: {
            title: "Confidenţialitatea ta este importantă pentru noi!",
            description: `<p>
					Utilizăm tehnologii de tip cookie pentru a optimiza funcţionalitatea site-ului web, pentru a se integra cu reţele de socializare şi a afişa reclame relevante pentru interesele tale.</p>`,
          },

          purposeItem: {
            service: "serviciu",
            services: "servicii",
          },

          purposes: {
            analytics: {
              title: "Statistică și analiză",
            },

            social: {
              title: "Reţele de socializare",
            },

            required: {
              title: "Funcționalitate de bază website",
            },
          },
        },
      },

      services: [
        {
          name: "Tehnologii de tip Cookie strict necesare",
          required: true,
          purposes: ["required"],
        },

        {
          name: "analytics",
          purposes: ["analytics"],
          description:
            "Aceste module cookie ne permit să analizăm modul de folosire a paginii web, putând astfel să ne adaptăm necesității userului prin îmbunătățirea permanentă a website-ului nostru.",
          default: true,
          required: false,
        },
      ],
    };
  </script>

  <script defer type="text/javascript" src="/klaro-0.7.9/klaro.js"></script>

  <script
    type="text/plain"
    data-type="text/javascript"
    data-name="analytics"
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-1DHC9CLKL5"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-1DHC9CLKL5");
  </script>
</svelte:head>

<style lang="scss">
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-size: 16px;
    --fontFamilyHeadings: -apple-system, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;

    --fontFamilyRead: Georgia, Times, serif;
    font-family: var(--fontFamilyHeadings);
  }
</style>
