<script lang="ts">
  export let html = "";
</script>

{@html html}

<style lang="scss">
  :global {
    p {
      margin: 10px auto;
      max-width: var(--max-width);
      line-height: 1.5em;
      font-size: 1.1em;
      word-break: break-word;
    }
  }
</style>
