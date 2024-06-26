<script lang="ts">
  import CurrencySelect from '$lib/business/common/CurrencySelect.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import { page } from '$app/stores'
  import BankNameSelect from '$lib/business/common/BankNameSelect.svelte'
  import * as Dialog from '$lib/components/ui/dialog'
  import { trpc } from '$lib/trpc/client'
  import type { BankName } from '$lib/trpc/types/bank-name'
  import type { Currency } from '$lib/trpc/types/currency'
  import CirclePlus from 'lucide-svelte/icons/circle-plus'
  import { toast } from 'svelte-sonner'

  export let workspaceId: string

  let name: string = ''
  let bankName: BankName = 'BOURSORAMA'
  let currency: Currency = 'EUR'

  let client = trpc($page)
  let bankAccountCreateMutation = client.bankAccount.create.createMutation()
  let utils = client.createUtils()

  const handleCreateAccount = async () => {
    $bankAccountCreateMutation.mutateAsync({ name, workspaceId, bankName, currency }).then(() => {
      utils.workspace.findOne.invalidate({ workspaceId: workspaceId })
      utils.workspace.findAllAccessible.invalidate()
      toast(`Account "${name}" created`)
    })
  }
</script>

<Dialog.Root>
  <Dialog.Trigger class="rounded-full hover:bg-secondary hover:text-secondary-foreground">
    <CirclePlus class="h-6 w-6" />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create an account</Dialog.Title>
      <Dialog.Description>Add a new bank account to this workspace</Dialog.Description>
    </Dialog.Header>

    <Input placeholder="Account name" type="text" bind:value={name} />
    <BankNameSelect bind:value={bankName} />
    <CurrencySelect bind:value={currency} />
    <Dialog.Footer>
      <Dialog.Close asChild let:builder>
        <Button builders={[builder]} on:click={handleCreateAccount}>Create</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
