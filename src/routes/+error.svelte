<script>
  import { onMount } from "svelte";

  onMount(() => {
    location.href = `/#${location.pathname.slice(1).replace("/", "-")}`;
  });
</script>
