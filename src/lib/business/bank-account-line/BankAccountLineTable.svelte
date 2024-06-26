<script lang="ts">
  import Table from '$lib/components/ui/table'
  import type { MyBankAccountLine } from './types'
  import { format } from 'date-fns'

  export let lines: MyBankAccountLine<'category' | 'payee' | 'bankAccount'>[]
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Date</Table.Head>
      <Table.Head>Label</Table.Head>
      <Table.Head>Amount</Table.Head>
      <Table.Head>Category</Table.Head>
      <Table.Head>Payee</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each lines as bankAccountLine}
      <Table.Row>
        <Table.Cell>{format(bankAccountLine.date, 'dd-MM-yyyy')}</Table.Cell>
        <Table.Cell>{bankAccountLine.label}</Table.Cell>
        <Table.Cell>{bankAccountLine.amount} {bankAccountLine.bankAccount.currency}</Table.Cell>
        <Table.Cell>{bankAccountLine.category?.name || '-'}</Table.Cell>
        <Table.Cell>{bankAccountLine.payee?.name || '-'}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
