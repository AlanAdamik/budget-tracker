<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/Icon.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Table from '$lib/components/ui/table'
  import { trpc } from '$lib/trpc/client'
  import type { Category } from '@prisma/client'

  export let categories: Category[]
  const client = trpc($page)
  const utils = client.createUtils()

  const deleteMutation = client.category.delete.createMutation()
  const handleDelete = async ({ id: categoryId, workspaceId }: Category) =>
    $deleteMutation.mutateAsync({ categoryId, workspaceId }).then(() => {
      utils.workspace.findOne.invalidate({ workspaceId })
      utils.workspace.findAllAccessible.invalidate()
    })
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Color</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each categories as category}
      <Table.Row>
        <Table.Cell>
          {#if category.icon}<Icon name={category.icon} />{/if}
          {category.name}
        </Table.Cell>
        <Table.Cell>{category.color || 'n/a'}</Table.Cell>
        <Table.Cell>
          <Button variant="secondary">Edit</Button>
          <Button variant="destructive" on:click={() => handleDelete(category)}>Delete</Button>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
