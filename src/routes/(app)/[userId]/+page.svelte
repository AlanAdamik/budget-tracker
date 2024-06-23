<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { page } from '$app/stores'
  import { trpc } from '$lib/trpc/client'
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import User from "lucide-svelte/icons/user";
    import Loader from "$lib/components/Loader.svelte"
  export let data
  const userQuery = trpc($page).user.default.createQuery({ userId: data.userId })
</script>
 
<Loader query={userQuery} let:data={user}>
  <div class="flex items-center gap-4">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="hover:bg-secondary rounded-full p-2">
        <Avatar.Root>
          <Avatar.Image src={user.image} alt={user.name} />
          <Avatar.Fallback>{user.name?.substr(0, 2)}</Avatar.Fallback>
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
</Loader>
