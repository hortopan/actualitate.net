<script lang="ts">
  import { onMount, getContext } from "svelte";

  function shortenStringWithoutWordcut(
    str: string,
    maxLen: number,
    separator = " "
  ): string {
    if (str.length <= maxLen) {
      return str;
    }
    return str.substring(0, str.lastIndexOf(separator, maxLen));
  }

  const x: SvelteStore<any> = getContext("context");
  let context = $x;
  $: context = $x;

  const type = "Article";

  const datePublished = new Date(context.data.published_at).toISOString();
  const dateModified = new Date(
    context.data.updated_at || context.data.published_at
  ).toISOString();

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${context.meta.canonical}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "WebPage",
          "@id": context.site_config.friendly_url,
          url: context.site_config.friendly_url,
          name: context.site_config.friendly_name,
        },
      },
    ],
  };

  if (context.data.category) {
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      position: breadcrumbList.itemListElement.length + 1,
      item: {
        "@type": "WebPage",
        "@id": context.data.category.url,
        url: context.data.category.url,
        name: context.data.category.name,
      },
    });
  }

  breadcrumbList.itemListElement.push({
    "@type": "ListItem",
    position: breadcrumbList.itemListElement.length + 1,
    item: {
      "@type": "WebPage",
      "@id": context.meta.canonical,
      url: context.meta.canonical,
      name: context.meta.title,
    },
  });

  const organization = {
    "@type": "Organization",
    "@id": `${context.site_config.friendly_url}/#organization`,
    name: context.site_config.friendly_name,
    url: context.site_config.friendly_url,
    logo: {
      "@type": "ImageObject",
      "@id": `${context.site_config.friendly_url}/#logo`,
      url: `${context.site_config.friendly_url}/logo.png`,
      caption: context.site_config.friendly_name,
    },
    image: {
      "@id": `${context.site_config.friendly_url}/#logo`,
    },
  };

  const website: any = {
    "@type": "WebSite",
    "@id": `${context.site_config.friendly_url}#website`,
    url: context.site_config.friendly_url,
    name: context.site_config.friendly_name,
    description: context.site_config.friendly_description,
    publisher: {
      "@id": `${context.site_config.friendly_url}#organization`,
    },
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: `${Config.friendly_url}/search?q={search_term_string}`,
    //   "query-input": "required name=search_term_string",
    // },
  };

  let imageObject: any = undefined;
  if (context.data.feature_image) {
    imageObject = {
      "@type": "ImageObject",
      "@id": `${context.meta.canonical}#primaryimage`,
      url: [context.data.feature_image],
    };
  }

  const webpage: any = {
    "@type": "WebPage",
    "@id": `${context.meta.canonical}#webpage`,
    url: context.meta.canonical,
    inLanguage: context.site_config.lang,
    name: context.meta.title,
    isPartOf: {
      "@id": `${context.site_config.friendly_url}#website`,
    },
    datePublished,
    dateModified,
    description: context.meta.description,

    breadcrumb: {
      "@id": `${context.meta.canonical}#breadcrumb`,
    },
  };

  if (imageObject) {
    webpage.primaryImageOfPage = {
      "@id": imageObject["@id"],
    };
  }

  let headline = shortenStringWithoutWordcut(context.meta.title, 110);

  if (headline !== context.meta.title) {
    headline = `${shortenStringWithoutWordcut(headline, 107)}...`;
  }

  const article: any = {
    "@type": type || "Article",
    "@id": `${context.meta.canonical}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": context.meta.canonical,
    },
    headline,

    datePublished,
    dateModified,

    author: {
      "@type": "Organization",
      name: context.site_config.friendly_name,
      url: context.site_config.friendly_url,
    },

    publisher: {
      "@type": "Organization",
      name: context.site_config.friendly_name,
      url: context.site_config.friendly_url,
      logo: {
        "@type": "ImageObject",
        url: `${context.site_config.friendly_url}/logo.png`,
      },
    },
    description: context.meta.description,
  };

  //   if (context.content.authors?.length) {
  //     article.author = context.content.authors.map((author: any) => {
  //       return {
  //         "@type": "Person",
  //         name: author.name,
  //         url: `${Config.friendly_url}/author/${author.id}`,
  //       };
  //     });
  //   }

  if (context.data.feature_image) {
    article.image = [context.data.feature_image];
    article.thumbnailUrl = [context.data.thumb_image];
  }

  if (context.data.tags) {
    article.keywords = context.data.tags.map((tag: any) => tag.name);
  }

  const items = [organization, website, breadcrumbList, webpage, article];

  if (imageObject) {
    items.push(imageObject);
  }

  const structure: any = {
    "@context": "http://schema.org",
    "@graph": items,
  };

  let structuredRAW = `<script type="application/ld+json">
	${JSON.stringify(structure)}
	<\/script>
	`;

  //google sees this twice apparently so let's "unmount" on mount
  onMount(() => (structuredRAW = ""));
</script>

{@html structuredRAW}
