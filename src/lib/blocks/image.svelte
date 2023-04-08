<script lang="ts">
  export let src: string;
  export let alt: string | null;
  export let caption: string | void;
  export let width: number | undefined;
  export let height: number | undefined;
</script>

{#if src}
  <figure>
    <img {src} {alt} {width} {height} />
    {#if caption}
      <figcaption>{caption}</figcaption>
    {/if}
  </figure>
{/if}

<style lang="scss">
  figure {
    margin: 10px auto;
    max-width: var(--max-width);
    padding: 10px;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 650px;
      height: auto;
      border-radius: 5px 5px 0 0;
      object-fit: contain;
    }

    figcaption {
      margin-top: -5px;
      padding: 10px;
      font-size: 0.8em;
      color: #666;
      text-align: center;
      background-color: #f5f5f5;
    }
  }
</style>
