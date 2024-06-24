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
  const createRuleMutation = client.rule.create.createMutation()

  let needle: string = ''
  let categoryId: string = ''
  let payeeId: string = ''

  const handleCreateRule = async () => {
    await $createRuleMutation.mutateAsync({ workspaceId, needle, categoryId, payeeId }).then(() => {
      toast(`Rule "${needle}" created`)
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
      <Dialog.Title>Create a rule</Dialog.Title>
      <Dialog.Description>Add a new rule to this workspace</Dialog.Description>
    </Dialog.Header>

    <Input placeholder="Text that will trigger that rule" type="text" bind:value={needle} />

    <Dialog.Footer>
      <Dialog.Close asChild let:builder>
        <Button builders={[builder]} on:click={handleCreateRule}>Create</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
