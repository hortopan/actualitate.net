<script lang="ts">
  export let data: any;
  import blocks from "$lib/blocks/index";
  import { getBlocks } from "$lib/blocksProcessor";
  const elements = getBlocks(data.data?.html, blocks);
</script>

<div class="container">
  <h1>{data.data.title}</h1>
  {#each elements as element}
    <svelte:component this={element.component} {...element.props} />
  {/each}
</div>

<style lang="scss">
  h1 {
    font-weight: 800;
    max-width: var(--max-width);
    margin: 15px auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .container {
    --max-width: 800px;
    min-height: calc(100vh - 205px);
    margin: 64px auto;
  }

  @media (max-width: 768px) {
    .container {
      --max-width: calc(100% - 30px);
    }
  }
</style>
