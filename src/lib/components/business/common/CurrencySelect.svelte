<script lang="ts">
  import { currencies, type Currency } from '$lib/trpc/types/currency'
  import Combobox from '$lib/components/Combobox.svelte'

  export let value: Currency
</script>

<Combobox bind:value options={currencies.map((currency) => ({ label: currency, id: currency }))} />
