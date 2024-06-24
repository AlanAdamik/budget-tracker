<script lang="ts">
  import { page } from '$app/stores'
  import CreateAccount from '$lib/components/business/account/CreateAccount.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import CreatePayee from '$lib/components/business/payee/CreatePayee.svelte'
  import { trpc } from '$lib/trpc/client'
  import * as Table from '$lib/components/ui/table'
  import Button from '$lib/components/ui/button/button.svelte'
  import CreateCategory from '$lib/components/business/category/CreateCategory.svelte'
  import Icon from '$lib/components/Icon.svelte'

  export let data
  const client = trpc($page)
  const utils = client.createUtils()

  const { workspaceId } = data

  const workspaceQuery = client.workspace.findOne.createQuery({ workspaceId })
  const bankAccountDeleteMutation = client.bankAccount.delete.createMutation()

  const handleBankAccountDelete = async (bankAccountId: string) => {
    await $bankAccountDeleteMutation.mutateAsync({ bankAccountId }).then(() => {
      utils.workspace.findOne.invalidate({ workspaceId })
      utils.workspace.findAllAccessible.invalidate()
    })
  }
</script>

<Loader query={workspaceQuery} let:data={workspace}>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl">{workspace.name}</h2>
    <h3 class="flex items-center gap-2">Accounts<CreateAccount {workspaceId} /></h3>
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
        {#each workspace.bankAccounts as account}
          <Table.Row>
            <Table.Cell>{account.name}</Table.Cell>
            <Table.Cell>{account.bankName}</Table.Cell>
            <Table.Cell>{account.currency}</Table.Cell>
            <Table.Cell>
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive" on:click={() => handleBankAccountDelete(account.id)}
                >Delete</Button
              >
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    <h3 class="flex items-center gap-2">Payees <CreatePayee {workspaceId} /></h3>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each workspace.payees as payee}
          <Table.Row>
            <Table.Cell>{payee.name}</Table.Cell>
            <Table.Cell>
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    <h3 class="flex items-center gap-2">Categories <CreateCategory {workspaceId} /></h3>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Color</Table.Head>
          <Table.Head>Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each workspace.categories as category}
          <Table.Row>
            <Table.Cell>
              {#if category.icon}<Icon name={category.icon} />{/if}
              {category.name}
            </Table.Cell>
            <Table.Cell>{category.color || 'n/a'}</Table.Cell>
            <Table.Cell>
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</Loader>
