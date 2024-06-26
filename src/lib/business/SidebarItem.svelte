<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/Icon.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { cn } from '$lib/utils'

  type $$Events = {
    click: MouseEvent
  }

  export let href: string | undefined = undefined
  export let icon: string | undefined = undefined
  export let child: boolean = false

  let isActive: boolean = false
  $: isActive = $page.url.pathname === href
</script>

<Button
  on:click
  variant="ghost"
  color="secondary"
  {href}
  data-active={isActive}
  class={cn('flex w-full items-center justify-start gap-2 data-[active=true]:bg-muted', {
    'pl-4': child,
  })}
>
  {#if icon}
    <Icon name={icon} />
  {/if}
  <span class="max-sm:hidden"><slot /></span>
</Button>
