<script lang="ts">
  import Sidebar from '$lib/business/Sidebar.svelte'
  import Separator from '$lib/components/ui/separator/separator.svelte'
  import type { PageData } from './$types'
  import Smile from 'lucide-svelte/icons/smile'

  export let data: PageData
</script>

<svelte:head>
  <title>Home | Sveltekit</title>
  <meta name="description" content="" />
</svelte:head>

<div class="flex min-h-screen">
  <Sidebar class="w-48" user={data.session?.user} />
  <Separator class="h-screen" orientation="vertical" />
  <div class="col-span-11 flex-1 px-8 sm:col-span-10">
    <slot />
  </div>
</div>
