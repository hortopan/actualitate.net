<script lang="ts">
  export let data: any;
</script>

<a class="item" href={data.url} title={data.meta_description}>
  {#if data.thumb_image}
    <div class="image">
      <img src={data.thumb_image} alt={data.title} />
      {#if data.category}
        <span class="category">{data.category.name}</span>
      {/if}
    </div>
  {/if}
  <span class="title">{data.title}</span>
</a>

<style lang="scss">
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    width: calc(100% / var(--flexColumns) - 20px);
    flex-grow: 0;
    margin: 10px;
    font-weight: 700;
    text-decoration: none;
    color: #000;
    background-color: #f5f5f5;
    padding: 5px;
    min-width: 280px;
    flex-shrink: 0;

    .title {
      margin: 10px 5px;
      font-size: 16px;
      display: block;
      height: 3.4em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      flex: 1;
      aspect-ratio: 16/9;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .category {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 5px;
        background-color: #1e4887;
        color: #fff;
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .item {
      width: calc(100% - 20px);
      min-width: calc(100% - 20px);
      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-clamp: none;
        height: auto;
      }
    }
  }
</style>
