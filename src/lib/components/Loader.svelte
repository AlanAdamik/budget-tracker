<script generics="A" lang="ts">
  import ProgressBar from './ProgressBar.svelte'
  import type { CreateQueryResult } from '@tanstack/svelte-query'
  interface $$Slots {
    default: { data: A }
  }

  type Q = CreateQueryResult<A, any>
  export let query: Q
  let { data, status, error } = $query
  $: ({ data, status, error } = $query)
</script>

{#if status == 'pending'}
  <ProgressBar />
{:else if status == 'error'}
  <p>Error: {error?.message}</p>
{:else if status == 'success' && data !== undefined}
  <slot {data} />
{:else}
  <p>Error: data is undefined</p>
{/if}
