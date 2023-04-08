<script lang="ts">
  export let html = "";
</script>

<div class="button">
  {@html html}
</div>

<style lang="scss">
  .button {
    margin: 10px auto;
    max-width: var(--max-width);
    background-color: rgb(55, 119, 208);
    border-radius: 5px;
    color: #fff;
    width: calc(80% - 20px);
    margin: auto;
    position: relative;
    height: 32px;
    font-family: var(--fontFamilyHeadings);

    :global(a) {
      text-decoration: none;
      color: #fff;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :global(a:hover) {
      background-color: rgba(105, 124, 149, 0.8);
      transition: all 0.2s ease-in-out;
    }
  }
</style>
