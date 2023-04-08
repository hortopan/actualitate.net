<script lang="ts">
  import StructuredContent from "../../[...all]/structuredContent.svelte";
  import { setContext } from "svelte";
  import { readable } from "svelte/store";
  import Config from "$lib/config";
  import { RETURN_DATA } from "$lib/types";
  import Render from "./render.svelte";
  export let context: RETURN_DATA;
  setContext("context", readable(context));
  setContext("amp", true);
</script>

<!doctype html>
<html amp lang={Config.lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{context.meta.title}</title>
    <meta name="description" content={context.meta.description} />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <link rel="canonical" href={context.meta.canonical} />
    <StructuredContent />
    !REPERIO_HEAD!
  </head>
  <body>
    <Render />
  </body>
</html>
