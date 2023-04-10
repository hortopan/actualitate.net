<script lang="ts">
  export let html = "";
</script>

{@html html}

<style lang="scss">
  :global {
    blockquote {
      margin: 10px 20px;
      max-width: var(--max-width);
      line-height: 1.5em;
      font-size: 1.1em;
      word-break: break-word;
      border-left: 5px solid #eaeaea;
      background-color: #f5f5f5;
      padding: 10px;
    }
  }
</style>
