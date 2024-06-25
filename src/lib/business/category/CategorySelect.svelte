<script lang="ts">
  import Combobox from '$lib/components/Combobox.svelte'

  export let value: string = ''
  export let categories: {
    id: string
    label: string
  }[]
</script>

<Combobox bind:value options={categories} />
