<script lang="ts">
    import '../app.postcss'
    import ProgressBar from '$lib/components/ProgressBar.svelte'
    import { Toaster } from "$lib/components/ui/sonner";
  </script>
  
  <ProgressBar />
  <Toaster />
  <slot />