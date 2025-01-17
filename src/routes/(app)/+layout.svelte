<script lang="ts">
  import type { LayoutData } from './$types'
  import { Button } from '$lib/components/ui/button'
  import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '$lib/components/ui/sidebar'

  export let data: LayoutData
</script>

<div class="flex min-h-screen">
  <Sidebar>
    <SidebarHeader>
      <p>My app</p>
    </SidebarHeader>
    <SidebarContent></SidebarContent>
    <SidebarFooter>
      {#if data.session}
        <form method="post" action="/signout">
          <Button variant="secondary" type="submit">Logout</Button>
        </form>
      {/if}
    </SidebarFooter>
  </Sidebar>
  <div class="flex-1 px-8 py-4 sm:col-span-10">
    <slot />
  </div>
</div>
