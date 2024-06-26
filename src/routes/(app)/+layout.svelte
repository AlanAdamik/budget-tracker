<script lang="ts">
  import type { LayoutData } from './$types'
  import Sidebar from '$lib/business/Sidebar.svelte'
  import { Separator } from '$lib/components/ui/separator'

  export let data: LayoutData
</script>

<div class="flex min-h-screen">
  <Sidebar class="w-48" user={data.session.user} />
  <Separator class="h-screen" orientation="vertical" />
  <div class="col-span-11 flex-1 px-8 py-4 sm:col-span-10">
    <slot />
  </div>
</div>
