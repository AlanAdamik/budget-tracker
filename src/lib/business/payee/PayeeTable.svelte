<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Table from '$lib/components/ui/table'
  import { trpc } from '$lib/trpc/client'
  import type { Payee } from '@prisma/client'

  const client = trpc($page)
  const utils = client.createUtils()

  export let payees: Payee[]

  const payeeDeleteMutation = client.payee.delete.createMutation()
  const handlePayeeDelete = async ({ id: payeeId, workspaceId }: Payee) =>
    $payeeDeleteMutation.mutateAsync({ payeeId, workspaceId }).then(() => {
      utils.workspace.findOne.invalidate({ workspaceId })
      utils.workspace.findAllAccessible.invalidate()
    })
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each payees as payee}
      <Table.Row>
        <Table.Cell>{payee.name}</Table.Cell>
        <Table.Cell>
          <Button variant="secondary">Edit</Button>
          <Button variant="destructive" on:click={() => handlePayeeDelete(payee)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
