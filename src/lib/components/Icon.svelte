<script lang="ts">
  import * as icons from 'lucide-svelte'
  export let name: string
</script>

<svelte:component this={icons[name]} class="h-4 w-4" {...$$props} />
