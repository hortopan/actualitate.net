<script lang="ts">
  type Image = {
    src: string;
    alt: string | null;
    width: number | undefined;
    height: number | undefined;
  };

  export let images: Image[];
  export let caption: string | void;

  const averageRatio =
    images.reduce((acc, image) => {
      if (image.width && image.height) {
        return acc + image.width / image.height;
      }
      return acc;
    }, 0) / images.length;
</script>

{#if images?.length}
  <amp-carousel
    id="carousel"
    class="carousel"
    layout="responsive"
    width="500"
    height={Math.ceil(500 / averageRatio)}
    type="slides"
    lightbox
  >
    {#each images as image}
      <amp-img
        src={image.src}
        layout="responsive"
        width={image.width}
        height={image.height}
        alt={image.alt}
      />
    {/each}
  </amp-carousel>
{/if}
