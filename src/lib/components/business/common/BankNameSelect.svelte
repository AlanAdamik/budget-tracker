<script lang="ts">
  import { type BankName, bankNames } from '$lib/trpc/types/bank-name'
  import Combobox from '$lib/components/Combobox.svelte'

  export let value: BankName
</script>

<Combobox bind:value options={bankNames.map((name) => ({ label: name, id: name }))} />
