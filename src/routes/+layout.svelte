<script lang="ts">
  import '../app.postcss'
  import ProgressBar from '$lib/components/ProgressBar.svelte'
  import { Toaster } from '$lib/components/ui/sonner'
  import { ModeWatcher } from 'mode-watcher'
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import { getQueryClient } from '$lib/utils'

  const queryClient = getQueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <ModeWatcher />
  <ProgressBar />
  <Toaster position="top-right" />
  <slot />
  <SvelteQueryDevtools />
</QueryClientProvider>
