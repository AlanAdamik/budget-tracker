<script lang="ts">
    import { page } from "$app/stores"
    import CreateAccount from "$lib/components/account/CreateAccount.svelte"
    import Loader from "$lib/components/Loader.svelte"
    import { trpc } from "$lib/trpc/client"
    export let data
    const workspaceQuery = trpc($page).workspace.findOne.createQuery({ id: data.workspaceId })
</script>

<Loader query={workspaceQuery} let:data={workspace}>
    <div class="flex flex-col">
        <h2 class="text-xl">{workspace.name}</h2>

        <h3 class="flex items-center gap-4">Accounts <CreateAccount workspaceId={data.workspaceId} /></h3>
        {#each workspace.bankAccounts as account}
            <div>
                {account.name} - ({account.lines.length} lines)
            </div>
        {/each}

        <h3>Payees</h3>
        {#each workspace.payees as payee}
            <div>
                {payee.name}
            </div>
        {/each}

        <h3>Categories</h3>
        {#each workspace.categories as category}
            <div>
                {category.name}
            </div>
        {/each}
    </div>
</Loader>