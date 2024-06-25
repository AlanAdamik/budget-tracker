<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Action from '$lib/components/Action.svelte'
  import Heading from '$lib/components/Heading.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import { trpc } from '$lib/trpc/client'

  export let data

  const { workspaceId } = data
  const client = trpc($page)

  const workspaceQuery = client.workspace.findOne.createQuery({ workspaceId })
</script>

<Loader query={workspaceQuery} let:data={workspace}>
  <Heading>{workspace.name}</Heading>
  <div class="grid grid-cols-3 gap-2">
    <Action
      on:click={() => goto(`/workspace/${workspaceId}/settings`)}
      class="min-h-[10rem]"
      icon="Cog">Settings</Action
    >
  </div>
</Loader>
