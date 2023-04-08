<script lang="ts">
  import { fade } from "svelte/transition";
  import { navigating } from "$app/stores";

  let timeout: ReturnType<typeof setTimeout>;
  let show = false;

  function exec(navigating: any) {
    if (!navigating) {
      show = false;
      if (timeout) {
        clearTimeout(timeout);
      }
      return;
    }

    timeout = setTimeout(() => {
      show = true;
    }, 250);
  }

  $: exec($navigating);
</script>

{#if show}
  <div class="loading" />
  <div class="overlay" in:fade|local />
{/if}

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1002;
    background: rgba(255, 255, 255, 0.4);
  }

  .loading {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 1001;
    // animated background gradient horizontal

    background: linear-gradient(
      to right,
      #4d91f7 0%,
      #4d91f7 50%,
      #fff 50%,
      #fff 100%
    );

    background-size: 200% 100%;
    animation: loading 3s ease-in-out infinite;

    @keyframes loading {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -100% 0;
      }
    }
  }
</style>
