<script lang="ts">
  export let src: string;
  export let alt: string | null;
  export let caption: string | void;
  export let width: number | undefined;
  export let height: number | undefined;
</script>

{#if src}
  <amp-img layout="responsive" {width} {height} {src} />

  {#if caption}
    <div class="caption">{caption}</div>
  {/if}
{/if}

<style lang="scss">
  .caption {
    font-size: 16px;
    font-style: italic;
    color: #666;
    padding: 5px 15px 5px 15px;
    text-align: center;
    margin: -15px -15px 15px -15px;
  }
</style>
