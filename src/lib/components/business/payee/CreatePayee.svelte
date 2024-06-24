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
  const createPayeeMutation = client.payee.create.createMutation()

  let name: string = ''
  const handleCreatePayee = async () => {
    await $createPayeeMutation.mutateAsync({ workspaceId, name }).then(() => {
      toast(`Payee "${name}" created`)
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
      <Dialog.Title>Create a payee</Dialog.Title>
      <Dialog.Description>Add a new payee to this workspace</Dialog.Description>
    </Dialog.Header>

    <Input placeholder="Payee name" type="text" bind:value={name} />

    <Dialog.Footer>
      <Dialog.Close asChild let:builder>
        <Button builders={[builder]} on:click={handleCreatePayee}>Create</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
