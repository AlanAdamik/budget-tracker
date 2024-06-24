<script lang="ts">
  import type { PageData } from './$types'
  import Header from '$lib/components/Header.svelte'
  import Smile from 'lucide-svelte/icons/smile'

  export let data: PageData
</script>

<svelte:head>
  <title>Home | Sveltekit</title>
  <meta name="description" content="" />
</svelte:head>

<div class="flex min-h-screen flex-col">
  <Header user={data?.session?.user} />
  <div class="flex-1">
    <main>
      <h1 class="flex items-center text-green-500">Home page<Smile /></h1>
    </main>
  </div>
</div>