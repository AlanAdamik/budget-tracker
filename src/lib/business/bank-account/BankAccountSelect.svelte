<script lang="ts">
  import Combobox from '$lib/components/Combobox.svelte'
  import type { BankAccount } from '@prisma/client'

  export let value: BankAccount | undefined
  export let bankAccounts: BankAccount[] = []

  let idValue: string = value?.id || ''

  $: value = bankAccounts.find((ba) => ba.id === idValue)
</script>

<Combobox
  placeholder="Pick an account"
  bind:value={idValue}
  options={bankAccounts.map((ba) => ({
    id: ba.id,
    label: ba.name,
  }))}
/>
