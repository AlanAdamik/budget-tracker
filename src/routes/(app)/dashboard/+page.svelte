<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import Loader from "$lib/components/Loader.svelte"
  import Button from "$lib/components/ui/button/button.svelte"
  import CreateWorkspace from "$lib/components/workspace/CreateWorkspace.svelte"
  import { trpc } from "$lib/trpc/client"
  import ChevronRight from "lucide-svelte/icons/chevron-right"
  const workspacesQuery = trpc($page).workspace.findAllAccessible.createQuery();
</script>

<Loader query={workspacesQuery} let:data={workspaces}>
  <div class="flex flex-col gap-4 items-start">

    <h3>Workspaces</h3>
    <CreateWorkspace />
    {#each workspaces as workspace}
      <Button class="flex items-center gap-4 justify-between" variant="secondary" on:click={() => goto(`/workspace/${workspace.id}`)}>
        <span>{workspace.name}</span>
        <ChevronRight class="w-6 h-6" />
      </Button>
    {/each}
    {#if workspaces.length === 0}
    <div class="rounded border border-primary flex items-center justify-center p-8 mt-8">
      <CreateWorkspace />
    </div>
    {/if}
  </div>
</Loader> 
