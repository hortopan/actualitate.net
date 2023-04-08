<script lang="ts">
  import { getContext } from "svelte";
  import type { RETURN_DATA } from "$lib/types";
  import Header from "../../[...all]/header.svelte";
  import blocks from "$lib/blocks/amp";
  import { getBlocks } from "$lib/blocksProcessor";
  import dayjs from "dayjs";
  import timezone from "dayjs/plugin/timezone";
  import "dayjs/locale/ro";
  import ListItem from "$lib/components/listItem.svelte";
  import Footer from "../../[...all]/footer.svelte";
  dayjs.locale("ro");
  dayjs.extend(timezone);

  const context: SvelteStore<RETURN_DATA> = getContext("context");

  const article = $context.data as any;

  // @ts-ignore
  const elements = getBlocks($context.data?.html, blocks);

  const gTag = `<script type="application/json">
	{
		"vars" : {
			"gtag_id": "G-1DHC9CLKL5",
			"config" : {
				"G-1DHC9CLKL5": { "groups": "default" }
			}
		}
	}
	<\/script>`;
</script>

<Header />

<article class="container">
  <header>
    <nav>
      <ul>
        <li><a href="/">Actualitate.net</a></li>
        {#if article.category}
          <li>
            <a href={article.category.url}>{article.category.name}</a>
          </li>
        {/if}
        <li><a href={article.url}>{article.title}</a></li>
      </ul>
    </nav>

    <h1>{article.title}</h1>
    <div class="info">
      <div class="time">
        Publicat:
        <time datetime={article.published_at}>
          {dayjs(article.published_at, "Europe/Bucharest").format(
            "DD MMMM, YYYY HH:mm"
          )}
        </time>
      </div>

      {#if article.reading_time}
        <div class="reading_time">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-book-open"
            ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
              d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
            /></svg
          >
          {#if article.reading_time === 1}
            1 minut
          {:else}
            {article.reading_time} minute
          {/if}
        </div>
      {/if}
    </div>
  </header>

  <section class="body">
    {#each elements as element}
      <svelte:component this={element.component} {...element.props} />
    {/each}
  </section>
</article>

{#if $context.more}
  <section class="more">
    <h2>Mai multe pentru tine</h2>
    <div class="list">
      {#each $context.more as item}
        <ListItem data={item} />
      {/each}
    </div>
  </section>
{/if}

<Footer />

<svelte:head>
  <style amp-boilerplate>
    body {
      -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    }
    @-webkit-keyframes -amp-start {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
    @-moz-keyframes -amp-start {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
    @-ms-keyframes -amp-start {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
    @-o-keyframes -amp-start {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
    @keyframes -amp-start {
      from {
        visibility: hidden;
      }
      to {
        visibility: visible;
      }
    }
  </style><noscript
    ><style amp-boilerplate>
      body {
        -webkit-animation: none;
        -moz-animation: none;
        -ms-animation: none;
        animation: none;
      }
    </style></noscript
  >

  <script
    async
    custom-element="amp-iframe"
    src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-analytics"
    src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-carousel"
    src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-lightbox-gallery"
    src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-video"
    src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-form"
    src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
  ></script>

  <script
    async
    custom-element="amp-sidebar"
    src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
  ></script>
</svelte:head>

<amp-analytics type="gtag" data-credentials="include">
  {@html gTag}
</amp-analytics>

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

  h1 {
    font-weight: 800;
    max-width: var(--max-width);
    margin: 5px auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  header {
    margin: 10px auto;
    max-width: var(--max-width);
    padding: 10px;

    nav {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;

        li::after {
          content: "/";
          margin: 0 2px;
          color: #666;
          font-size: 0.8em;
        }

        li:last-child::after {
          content: "";
        }

        li {
          max-width: calc(100% - 200px);
          height: 1.25em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            text-decoration: none;
            text-transform: lowercase;
            font-size: 0.8em;
            color: #666;
          }
        }
      }
    }

    .info {
      font-size: 0.8em;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .reading_time {
        display: flex;
        align-items: center;
        svg {
          width: 1em;
          height: 1em;
          margin-right: 5px;
        }
      }
    }
  }

  .body {
    :global(a) {
      text-decoration: none;
      color: #3920c6;
    }
  }

  section.more {
    border-top: 1px solid #f5f5f5;
    background: linear-gradient(to bottom, #f5f5f5 0%, #fff 5%);
    padding-top: 20px;

    h2 {
      text-align: center;
    }

    .list {
      border-top: 1px solid #f5f5f5;

      --flexColumns: 3;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .container {
    --max-width: 800px;
    min-height: calc(100vh - 205px);
    margin: 64px auto;
    max-width: var(--max-width);
    border: 1px solid #f5f5f5;
    padding: 10px;
    background: linear-gradient(to bottom, #f5f5f5 0%, #fff 250px);
  }

  @media (max-width: 768px) {
    .container {
      --max-width: calc(100% - 30px);
      padding: 5px;
    }

    .list {
      .item {
        width: calc(100% - 20px);
        .title {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }

    header {
      h1 {
        max-width: 100%;
      }
    }
  }
</style>
