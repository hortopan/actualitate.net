<script lang="ts">
  import ListItem from "$lib/components/listItem.svelte";
  export let data: any;
  // { page: 1, limit: 2, pages: 119, total: 238, next: 2, prev: null }
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

  {#if data.pagination?.prev || data.pagination?.next}
    <div class="pagination">
      {#if data.pagination?.prev}
        <a href="{data.meta.canonical}/page:{data.pagination.prev}"
          >Pagina precedentă</a
        >
      {/if}

      {#if data.pagination?.next}
        <a
          href="{data.meta.canonical}/page:{data.pagination.next}"
          title="Pagina următoare">Pagina următoare</a
        >
      {/if}
    </div>
  {/if}
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

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
    a {
      margin: 10px;
      display: block;
      padding: 8px 16px;
      border: 1px solid #eaeaea;
      border-radius: 4px;
      text-decoration: none;
      color: #000;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: #eaeaea;
      }
    }
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
