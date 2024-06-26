<script lang="ts">
  import type { User } from '@auth/sveltekit'
  import { signIn, signOut } from '@auth/sveltekit/client'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import { cn } from '$lib/utils'
  import { trpc } from '$lib/trpc/client'

  import SidebarItem from './SidebarItem.svelte'
  import Loader from '$lib/components/Loader.svelte'
  import ModeToggle from '$lib/components/ModeToggle.svelte'

  import * as Avatar from '$lib/components/ui/avatar'
  import { Collapsible, CollapsibleTrigger } from '$lib/components/ui/collapsible'
  import CollapsibleContent from '$lib/components/ui/collapsible/collapsible-content.svelte'
  import { ChevronsUpDown } from 'lucide-svelte'

  let className: string | undefined = undefined
  export { className as class }

  export let user: User | undefined

  const client = trpc($page)
  const workspaceQuery = client.workspace.findAllAccessible.createQuery()
</script>

<nav class={cn('flex min-h-screen flex-col justify-start gap-2 px-2 sm:py-5', className)}>
  {#if user}
    <SidebarItem href="/dashboard" icon="LayoutDashboard">Dashboard</SidebarItem>
    <div class="space-y-2 rounded bg-muted/50 p-2">
      <div class="text-md">Workspaces</div>
      <Loader query={workspaceQuery} let:data={workspaces}>
        {#each workspaces as workspace}
          <SidebarItem href={`/workspace/${workspace.id}`} child>{workspace.name}</SidebarItem>
        {/each}
      </Loader>
    </div>
    <div class="space-y-2 justify-self-end rounded bg-muted/50 p-2">
      <Collapsible>
        <CollapsibleTrigger class="flex w-full items-center gap-2 rounded border p-2">
          <ChevronsUpDown class="h-3 w-3" />
          {user.name}
          <Avatar.Root class="h-6 w-6">
            <Avatar.Image src={user.image} alt={user.name} />
            <Avatar.Fallback>{user.name?.substr(0, 2)}</Avatar.Fallback>
          </Avatar.Root>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarItem on:click={() => signOut()} icon="Power">Sign out</SidebarItem>
        </CollapsibleContent>
      </Collapsible>
    </div>
  {:else}
    <SidebarItem on:click={() => signIn()}>Sign In</SidebarItem>
  {/if}
  <div class="flex w-full items-center justify-between">
    Dark mode
    <ModeToggle />
  </div>
</nav>
