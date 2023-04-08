<script lang="ts">
  import ListItem from "$lib/components/listItem.svelte";
  export let data: any;
</script>

<div class="container">
  {#if data.path !== "/"}
    <h1>{data.data[0].category.name}</h1>
  {/if}

  <div class="list">
    {#each data.data as item}
      <ListItem data={item} />
    {/each}
  </div>
</div>

<style lang="scss">
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

  .container {
    --max-width: 800px;
    min-height: calc(100vh - 205px);
    margin: 64px auto;
    h1 {
      text-align: center;
      margin: 0;
      padding: 0;
      font-size: 32px;
      font-weight: 700;
      border-bottom: 1px solid #eaeaea;
    }
  }

  @media (max-width: 768px) {
    .container {
      --max-width: calc(100% - 30px);
    }
  }
</style>
