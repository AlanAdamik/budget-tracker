<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { page } from '$app/stores'
  import { trpc } from '$lib/trpc/client'
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import User from "lucide-svelte/icons/user";
    import Button from "$lib/components/ui/button/button.svelte"

  export let data
  const user = trpc($page).user.default.createQuery({ userId: data.userId })

  $: name = $user.data?.name || `User ${data.userId}`
</script>
 
{#if $user.isLoading}
  <p>Loading...</p>
{:else if $user.isSuccess}
<div class="flex items-center gap-4">
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="hover:bg-secondary rounded-full p-2">
        <Avatar.Root>
          <Avatar.Image src={$user.data.image} alt={name} />
          <Avatar.Fallback>{$user.data.name?.substr(0, 2)}</Avatar.Fallback>
        </Avatar.Root>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <User class="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  </div>
{:else if $user.isError}
  <p>Error: {$user.error.message}</p>
{/if}
