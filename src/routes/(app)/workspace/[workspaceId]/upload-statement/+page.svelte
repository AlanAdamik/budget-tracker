<script lang="ts">
  import { page } from '$app/stores'
  import BankAccountLineTable from '$lib/business/bank-account-line/BankAccountLineTable.svelte'
  import { parseFile } from '$lib/business/bank-account-line/parser'
  import BankAccountSelect from '$lib/business/bank-account/BankAccountSelect.svelte'
  import InputFile from '$lib/components/ui/input/input-file.svelte'
  import { trpc } from '$lib/trpc/client.js'
  import type { BankAccount, BankAccountLine } from '@prisma/client'

  export let data
  const { workspaceId } = data

  const query = trpc($page).bankAccount.fromWorkspace.createQuery({ workspaceId })

  let bankAccount: BankAccount
  let files: FileList
  let lines: BankAccountLine[] = []
  let error: any

  $: if (files) {
    for (const file of files) {
      file.text().then((text) => {
        try {
          lines = parseFile(text, 'BOURSORAMA')
        } catch (e) {
          error = e
        }
      })
    }
  }

  $: bankAccounts = $query.data || []
</script>

<div class="space-y-4">
  <BankAccountSelect bind:value={bankAccount} {bankAccounts} />
  <InputFile disabled={!bankAccount} bind:files max={1} />

  {#if error}
    <div>{JSON.stringify(error)}</div>
  {/if}

  <BankAccountLineTable
    lines={lines.map((l) => ({ ...l, bankAccount, category: null, payee: null }))}
  />
</div>
