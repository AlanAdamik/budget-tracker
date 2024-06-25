<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import CreateWorkspace from '$lib/business/workspace/CreateWorkspace.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { trpc } from '$lib/trpc/client'
  import ChevronRight from 'lucide-svelte/icons/chevron-right'
  const workspacesQuery = trpc($page).workspace.findAllAccessible.createQuery()
</script>

<Loader query={workspacesQuery} let:data={workspaces}>
  <div class="flex flex-col items-start gap-4">
    <h3>Workspaces</h3>
    <CreateWorkspace />
    {#each workspaces as workspace}
      <Button
        class="flex items-center justify-between gap-4"
        variant="secondary"
        on:click={() => goto(`/workspace/${workspace.id}`)}
      >
        <span>{workspace.name}</span>
        <ChevronRight class="h-6 w-6" />
      </Button>
    {/each}
    {#if workspaces.length === 0}
      <div class="mt-8 flex items-center justify-center rounded border border-primary p-8">
        <CreateWorkspace />
      </div>
    {/if}
  </div>
</Loader>
