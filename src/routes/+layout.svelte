<script lang="ts">
  import '../app.postcss'
  import ProgressBar from '$lib/components/ProgressBar.svelte'
  import { Toaster } from '$lib/components/ui/sonner'
  import { ModeWatcher } from 'mode-watcher'
</script>

<ModeWatcher />
<ProgressBar />
<Toaster position="top-right" />
<slot />
