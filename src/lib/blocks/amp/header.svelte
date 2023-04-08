<script langs="ts">
  export let html = "";
</script>

<div class="header">
  {@html html}
</div>

<style lang="scss">
  .header {
    margin: 10px auto;
    padding: 20px;
    width: calc(100% - 40px);
    background-color: #0b2542;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    :global(a) {
      text-transform: uppercase;
      color: #fff;
      background-color: rgba(105, 124, 149, 0.8);
      padding: 10px;
      border-radius: 5px;
      // some shadow
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      text-decoration: none;
    }

    :global(h2) {
      margin: 10px 0;
      font-weight: 900;
      font-size: 2em;
    }

    :global(a:hover) {
      background-color: rgba(105, 124, 149, 1);
      transition: all 0.2s ease-in-out;
    }
  }
</style>
