<script lang="ts">
  export let src: string;
  export let alt: string | null;
  export let caption: string | void;
  export let width: number | undefined;
  export let height: number | undefined;

  if (!width) {
    width = 600;
  }

  if (!height) {
    height = 400;
  }
</script>

{#if src}
  <figure>
    <amp-img layout="responsive" {width} {height} {src} {alt} />
    {#if caption}
      <figcaption>{caption}</figcaption>
    {/if}
  </figure>
{/if}

<style lang="scss">
  figure {
    figcaption {
      padding: 10px;
      font-size: 0.8em;
      color: #666;
      text-align: center;
      background-color: #f5f5f5;
    }
  }
</style>
