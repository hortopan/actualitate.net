<script lang="ts">
  import dayjs from "dayjs";
  import timezone from "dayjs/plugin/timezone";
  import "dayjs/locale/ro";
  dayjs.locale("ro");
  dayjs.extend(timezone);
  import blocks from "$lib/blocks";
  import { getBlocks, type Entry } from "$lib/blocksProcessor";
  import StructuredContent from "./structuredContent.svelte";
  import ListItem from "$lib/components/listItem.svelte";

  export let data: any;

  const url = new URL(data.meta.canonical);
  const ampURL = `${url.origin}/amp${url.pathname}`;
  let elements: Entry[] = [];
  $: elements = getBlocks(data.data?.html, blocks);
</script>

<article class="container">
  <header>
    <nav>
      <ul>
        <li><a href="/">Actualitate.net</a></li>
        {#if data.data.category}
          <li>
            <a href={data.data.category.url}>{data.data.category.name}</a>
          </li>
        {/if}
        <li><a href={data.data.url}>{data.data.title}</a></li>
      </ul>
    </nav>

    <h1>{data.data.title}</h1>
    <div class="info">
      <div class="time">
        Publicat:
        <time datetime={data.data.published_at}>
          {dayjs(data.data.published_at, "Europe/Bucharest").format(
            "DD MMMM, YYYY HH:mm"
          )}
        </time>
      </div>

      {#if data.data.reading_time}
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
          {#if data.data.reading_time === 1}
            1 minut
          {:else}
            {data.data.reading_time} minute
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

{#if data.more}
  <section class="more">
    <h2>Mai multe pentru tine</h2>

    <div class="list">
      {#each data.more as item}
        <ListItem data={item} />
      {/each}
    </div>
  </section>
{/if}

<svelte:head>
  <link rel="amphtml" href={ampURL} />
  <StructuredContent />
</svelte:head>

<style lang="scss">
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

  section.more {
    border-top: 1px solid #f5f5f5;
    background: linear-gradient(to bottom, #f5f5f5 0%, #fff 5%);
    padding-top: 20px;

    h2 {
      text-align: center;
    }

    .list {
      --flexColumns: 3;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  .body {
    :global(a) {
      text-decoration: none;
      color: #3920c6;
    }
  }

  .container {
    background: linear-gradient(to bottom, #f5f5f5 0%, #fff 250px);
    --max-width: 800px;
    min-height: calc(100vh - 205px);
    margin: 64px auto;
    max-width: var(--max-width);
    border: 1px solid #f5f5f5;
    padding: 10px;
  }

  @media (max-width: 768px) {
    .container {
      --max-width: calc(100% - 30px);
      padding: 5px;
    }

    header {
      h1 {
        max-width: 100%;
      }
    }
  }
</style>
