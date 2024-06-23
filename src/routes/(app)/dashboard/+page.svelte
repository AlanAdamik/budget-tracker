<script lang="ts">
    import { toast } from "svelte-sonner"
    import { page } from "$app/stores"
    import Loader from "$lib/components/Loader.svelte"
    import Button from "$lib/components/ui/button/button.svelte"
    import { Dialog, DialogClose, DialogTrigger } from "$lib/components/ui/dialog"
    import DialogContent from "$lib/components/ui/dialog/dialog-content.svelte"
    import DialogDescription from "$lib/components/ui/dialog/dialog-description.svelte"
    import DialogFooter from "$lib/components/ui/dialog/dialog-footer.svelte"
    import DialogHeader from "$lib/components/ui/dialog/dialog-header.svelte"
    import DialogTitle from "$lib/components/ui/dialog/dialog-title.svelte"
    import Input from "$lib/components/ui/input/input.svelte"
    import { trpc } from "$lib/trpc/client"

    let workspaceName = "";

  const workspacesQuery = trpc($page).user.workspaces.createQuery();
  const createWorkspaceMutation = trpc($page).user.addWorkspace.createMutation();
  const handleCreateWorkspace = () => {
    $createWorkspaceMutation.mutateAsync({ name: workspaceName }).then(() => {
      toast('Workspace created');
    })
  }
</script>

<Loader query={workspacesQuery} let:data={workspaces}>
  <h3>Workspaces</h3>
  {#if workspaces.length === 0}
  <div class="rounded border border-primary flex items-center justify-center p-8 mt-8">
    <Dialog>
      <DialogTrigger asChild let:builder>
        <Button builders={[builder]}>Create a workspace</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a workspace
          </DialogTitle>
          <DialogDescription>
            Create a workspace that you can share with others
          </DialogDescription>
        </DialogHeader>
        <Input type="text" bind:value={workspaceName} />
        <DialogFooter>
          <DialogClose asChild let:builder>
            <Button builders={[builder]} on:click={handleCreateWorkspace}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  {/if}
  {#each workspaces as workspace}
    <div>
        <p>
          {workspace.name}
        </p>
    </div>
  {/each}
</Loader> 
