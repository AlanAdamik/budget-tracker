<script lang="ts">
  import { page } from '$app/stores'
  import CreateAccount from '$lib/business/bank-account/CreateBankAccount.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import CreatePayee from '$lib/business/payee/CreatePayee.svelte'
  import { trpc } from '$lib/trpc/client'
  import CreateCategory from '$lib/business/category/CreateCategory.svelte'
  import Heading from '$lib/components/Heading.svelte'
  import BankAccountTable from '$lib/business/bank-account/BankAccountTable.svelte'
  import PayeeTable from '$lib/business/payee/PayeeTable.svelte'
  import CategoryTable from '$lib/business/category/CategoryTable.svelte'

  export let data
  const client = trpc($page)

  const { workspaceId } = data

  const workspaceQuery = client.workspace.findOne.createQuery({ workspaceId })
</script>

<Loader query={workspaceQuery} let:data={workspace}>
  <div class="flex flex-col gap-4">
    <Heading>
      <span>Workspace > {workspace.name} > Settings</span>
    </Heading>
    <Heading level="2">Accounts<CreateAccount {workspaceId} /></Heading>
    <BankAccountTable bankAccounts={workspace.bankAccounts} />

    <Heading level="2">Payees <CreatePayee {workspaceId} /></Heading>
    <PayeeTable payees={workspace.payees} />

    <Heading level="2">Categories <CreateCategory {workspaceId} /></Heading>
    <CategoryTable categories={workspace.categories} />
  </div>
</Loader>
