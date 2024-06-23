<script lang="ts" generics="A">
    import type { CreateQueryResult } from "@tanstack/svelte-query"
    export let query: CreateQueryResult<A, any>;
    const { data, isLoading, isError, error, isSuccess} = $query;

    interface $$Slots {
        default: { data: A };
    }
</script>

{#if isLoading}
    <p>Loading...</p>
{:else if isError}
    <p>Error: {error.message}</p>
{:else if isSuccess && data}
    <slot {data} />
{/if}

