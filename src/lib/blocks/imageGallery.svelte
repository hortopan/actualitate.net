<script lang="ts">
  import { fade } from "svelte/transition";
  type Image = {
    src: string;
    alt: string | null;
    width: number | undefined;
    height: number | undefined;
  };

  import { register } from "swiper/element/bundle";
  register();

  export let images: Image[];
  export let caption: string | void;

  let index = 1;
  let dom: any;

  function slideChange(_e: any) {
    index = dom.swiper?.activeIndex + 1;
  }

  let domFull: any;

  function initDomFull(element: any) {
    domFull = element;
    domFull.swiper!.activeIndex = dom.swiper?.activeIndex;
  }

  let fullscreen = false;

  function toggleFull() {
    fullscreen = !fullscreen;
  }
</script>

<div class="container">
  <swiper-container bind:this={dom} on:slidechange={slideChange}>
    {#each images as image}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <swiper-slide on:click={toggleFull}>
        <div class="item">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </div>
      </swiper-slide>
    {/each}
  </swiper-container>

  {#if dom?.swiper?.activeIndex > 0}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="arrowLeft"
      on:click={() => {
        dom.swiper?.slidePrev();
      }}
    />
  {/if}

  {#if dom?.swiper?.activeIndex < images.length - 1}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="arrowRight"
      on:click={() => {
        dom.swiper?.slideNext();
      }}
    />
  {/if}

  <div class="controller">
    <span class="caption">{@html caption || "Galerie imagini"}</span>
    <span>{index} / {images.length}</span>
  </div>
</div>

{#if fullscreen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fullscreen"
    on:click|self={toggleFull}
    transition:fade|local={{ duration: 100 }}
  >
    <swiper-container use:initDomFull on:slidechange={slideChange}>
      {#each images as image}
        <swiper-slide>
          <div
            class="item"
            style="--image: url({image.src})"
            on:click={toggleFull}
          />
        </swiper-slide>
      {/each}
    </swiper-container>

    {#if domFull?.swiper?.activeIndex > 0}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="arrowLeft"
        on:click={() => {
          domFull.swiper?.slidePrev();
        }}
      />
    {/if}

    {#if domFull?.swiper?.activeIndex < images.length - 1}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="arrowRight"
        on:click={() => {
          domFull.swiper?.slideNext();
        }}
      />
    {/if}
  </div>
{/if}

<style lang="scss">
  .arrowLeft,
  .arrowRight {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
  }

  .arrowLeft::before {
    content: "";
    position: absolute;
    top: 49%;
    left: 39%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
  }

  .arrowRight::before {
    content: "";
    position: absolute;
    top: 49%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
  }

  .arrowLeft::before {
    border-color: transparent #fff transparent transparent;
    margin-left: -2px;
  }

  .arrowRight::before {
    border-color: transparent transparent transparent #fff;
    margin-left: 2px;
  }

  .arrowLeft {
    left: 25px;
    background-color: #333;
  }

  .arrowRight {
    right: 25px;
    background-color: #333;
  }

  .container {
    position: relative;
    margin: 10px auto;
    max-width: var(--max-width);

    .item {
      aspect-ratio: 1 / 1;

      cursor: zoom-in;

      display: flex;
      align-items: center;
      justify-content: center;

      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }

    swiper-container {
      background-color: #f5f3f3;
      padding: 10px;
    }

    .controller {
      padding: 10px;
      font-size: 0.8em;
      color: #666;
      text-align: center;
      background-color: #f5f5f5;
      border-top: 1px solid #ccc;

      span {
        margin-right: 10px;
        display: block;
      }
    }
  }

  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 9999;

    .item {
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #000;
      background-image: var(--image);
      height: 100vh;
      cursor: zoom-out;
    }
  }
</style>
