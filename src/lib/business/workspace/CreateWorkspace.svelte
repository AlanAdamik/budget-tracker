<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/button/button.svelte'
  import { Dialog, DialogClose, DialogTrigger } from '$lib/components/ui/dialog'
  import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte'
  import DialogDescription from '$lib/components/ui/dialog/dialog-description.svelte'
  import DialogFooter from '$lib/components/ui/dialog/dialog-footer.svelte'
  import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte'
  import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import { trpc } from '$lib/trpc/client'
  import { toast } from 'svelte-sonner'

  export let workspaceName: string = ''
  let client = trpc($page)
  let utils = client.createUtils()

  const createWorkspaceMutation = client.workspace.createOne.createMutation({
    onSuccess: () => utils.workspace.findAllAccessible.invalidate(),
  })
  const handleCreateWorkspace = () => {
    $createWorkspaceMutation
      .mutateAsync({ name: workspaceName })
      .then(() => toast(`Workspace "${workspaceName}" created`))
  }
</script>

<Dialog>
  <DialogTrigger asChild let:builder>
    <Button builders={[builder]}>Create a workspace</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create a workspace</DialogTitle>
      <DialogDescription>Create a workspace that you can share with others</DialogDescription>
    </DialogHeader>
    <Input placeholder="'Personal', 'Home'" type="text" bind:value={workspaceName} />
    <DialogFooter>
      <DialogClose asChild let:builder>
        <Button builders={[builder]} on:click={handleCreateWorkspace}>Create</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
