<script lang="ts">
  export let html: string;
</script>

<div>
  {@html html}
</div>

<style lang="scss">
  div {
    :global {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 10px auto;
        max-width: var(--max-width);
        font-weight: 800;
        font-family: var(--fontFamilyHeadings);
      }
    }
  }
</style>
