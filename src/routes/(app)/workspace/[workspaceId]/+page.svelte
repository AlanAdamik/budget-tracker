<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import BankAccountLineTable from '$lib/business/bank-account-line/BankAccountLineTable.svelte'
  import Action from '$lib/components/Action.svelte'
  import Heading from '$lib/components/Heading.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { trpc } from '$lib/trpc/client'

  export let data

  const { workspaceId } = data
  const client = trpc($page)

  const workspaceQuery = client.workspace.findOne.createQuery({ workspaceId })
  const linesQuery = client.bankAccountLine.fromWorkspace.createQuery({ workspaceId })
</script>

<Loader query={workspaceQuery} let:data={workspace}>
  <Heading>Workspace > {workspace.name}</Heading>
  <div class="mb-10 grid h-8 grid-cols-3 gap-2">
    <Action on:click={() => goto(`/workspace/${workspaceId}/settings`)} icon="Cog">Settings</Action>
  </div>

  <Heading>
    Transactions
    <Button href={`/workspace/${workspaceId}/upload-statement`}>Upload statement</Button>
  </Heading>

  <Loader query={linesQuery} let:data={lines}>
    <BankAccountLineTable {lines} />
  </Loader>
</Loader>
