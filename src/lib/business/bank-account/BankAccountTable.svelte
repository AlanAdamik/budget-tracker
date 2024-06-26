<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Table from '$lib/components/ui/table'
  import { trpc } from '$lib/trpc/client'
  import type { BankAccount } from '@prisma/client'

  export let bankAccounts: BankAccount[]
  const client = trpc($page)
  const utils = client.createUtils()

  const deleteMutation = client.bankAccount.delete.createMutation()
  const handleDelete = async ({ id: bankAccountId, workspaceId }: BankAccount) =>
    $deleteMutation.mutateAsync({ bankAccountId }).then(() => {
      utils.workspace.findOne.invalidate({ workspaceId })
      utils.workspace.findAllAccessible.invalidate()
    })
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Bank</Table.Head>
      <Table.Head>Currency</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each bankAccounts as account}
      <Table.Row>
        <Table.Cell>{account.name}</Table.Cell>
        <Table.Cell>{account.bankName}</Table.Cell>
        <Table.Cell>{account.currency}</Table.Cell>
        <Table.Cell>
          <Button variant="secondary">Edit</Button>
          <Button variant="destructive" on:click={() => handleDelete(account)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
