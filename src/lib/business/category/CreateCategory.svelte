<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/button/button.svelte'
  import * as Dialog from '$lib/components/ui/dialog'
  import Input from '$lib/components/ui/input/input.svelte'
  import { trpc } from '$lib/trpc/client'
  import CirclePlus from 'lucide-svelte/icons/circle-plus'
  import { toast } from 'svelte-sonner'

  export let workspaceId: string

  const client = trpc($page)
  const utils = client.createUtils()
  const createCategoryMutation = client.category.create.createMutation()

  let name: string = ''
  let monthlyBudget: string = '100'

  const handleCreateCategory = async () => {
    await $createCategoryMutation
      .mutateAsync({ workspaceId, name, monthlyBudget: parseFloat(monthlyBudget) })
      .then(() => {
        toast(`Category "${name}" created`)
        utils.workspace.findOne.invalidate({ workspaceId })
        utils.workspace.findAllAccessible.invalidate()
      })
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="rounded-full hover:bg-secondary hover:text-secondary-foreground">
    <CirclePlus class="h-6 w-6" />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create a category</Dialog.Title>
      <Dialog.Description>Add a new category to this workspace</Dialog.Description>
    </Dialog.Header>

    <Input placeholder="Category name" type="text" bind:value={name} />
    <Input placeholder="Allowance" type="number" bind:value={monthlyBudget} />

    <Dialog.Footer>
      <Dialog.Close asChild let:builder>
        <Button builders={[builder]} on:click={handleCreateCategory}>Create</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
