<script lang="ts">
  import type { User as UserType } from '@prisma/client'
  import { signIn, signOut } from '@auth/sveltekit/client'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import * as Avatar from '$lib/components/ui/avatar'
  import Power from 'lucide-svelte/icons/power'
  import { goto } from '$app/navigation'
  import ModeToggle from './ModeToggle.svelte'

  export let user: UserType | undefined
</script>

<header class="flex items-center justify-between p-4">
  <p>Budget Tracker</p>

  <div class="flex items-center gap-4">
    <ModeToggle />
    {#if user}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="rounded-full p-2 hover:bg-secondary">
          <Avatar.Root>
            <Avatar.Image src={user.image} alt={user.name} />
            <Avatar.Fallback>{user.name?.substr(0, 2)}</Avatar.Fallback>
          </Avatar.Root>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Group>
            <DropdownMenu.Item on:click={() => goto('/dashboard')}>
              <span>Dashboard</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item on:click={() => signOut()}>
            <Power class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {:else}
      <button on:click={() => signIn()}>Sign In</button>
    {/if}
  </div>
</header>
