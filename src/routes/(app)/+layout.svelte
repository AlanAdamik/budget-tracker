<script lang="ts">
  import type { LayoutData } from './$types'
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import Header from '$lib/components/Header.svelte'
  import { getQueryClient } from '$lib/utils'
  
  const queryClient = getQueryClient();
  export let data: LayoutData
</script>

<QueryClientProvider client={queryClient}>
  <div class="flex min-h-screen flex-col">
    <Header user={data.session.user} />
    <div class="flex-1 px-8">
      <slot />
    </div>
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>
