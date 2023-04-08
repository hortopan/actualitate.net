<script lang="ts">
  export let html = "";
</script>

<div class="bookmark">
  {@html html}
</div>

<style lang="scss">
  .bookmark {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin: 10px auto;
    max-width: var(--max-width);

    :global {
      figure {
        margin: 0;
        padding: 0;
      }

      .kg-bookmark-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }

      .kg-bookmark-description {
        display: none;
      }

      .kg-bookmark-description {
        display: none;
      }

      a {
        text-decoration: none;
        color: #000;
      }

      .kg-bookmark-metadata {
        display: none;
      }

      .kg-bookmark-thumbnail {
        max-width: 100px;
        margin-left: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
</style>
