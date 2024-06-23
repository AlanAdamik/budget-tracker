<script lang="ts">
    import { Toaster } from "$lib/components/ui/sonner";
    import '../app.postcss'
    import ProgressBar from '$lib/components/ProgressBar.svelte'
  </script>
  
  <ProgressBar />
  <Toaster />
  <slot />