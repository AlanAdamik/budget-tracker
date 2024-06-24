<script lang="ts">
    import type { PageData } from "./$types"
    import { createQuery } from "@tanstack/svelte-query"
    import Loader from "$lib/components/Loader.svelte"
    import { getTransactionsFromDate } from "$lib/tink/client"
    import { format } from "date-fns"

    export let data: PageData;

    const { accessToken } = data;

    let date = new Date();
    let transactionQuery = createQuery({
        queryKey: ["transactions", format(date, 'yyyy-MM-dd')],
        queryFn: () => getTransactionsFromDate(date, accessToken.access_token)
    })
</script>

<Loader query={transactionQuery} let:data={result}>
    {#each result.transactions as transaction}
        <div>
            <p>{transaction.id}</p>
            <p>{transaction.amount.value.unscaledValue}</p>
            <p>{transaction.amount.currencyCode}</p>
            <p>{transaction.descriptions.display}</p>
            <p>{transaction.descriptions.original}</p>
            <p>{transaction.status}</p>
            <p>{transaction.dates.booked}</p>
        </div>
    {/each}
</Loader>