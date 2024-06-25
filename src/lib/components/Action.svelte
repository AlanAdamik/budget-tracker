<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui'
  import Button from './ui/button/button.svelte'
  import Icon from './Icon.svelte'
  import { cn } from '$lib/utils'

  type $$Events = ButtonPrimitive.Events

  let className: string | undefined = undefined
  export let icon: string | undefined
  export { className as class }
</script>

<Button variant="secondary" class={cn(className, 'h-full w-full')} on:click on:keydown>
  {#if icon}
    <Icon name={icon} />
  {/if}
  <slot />
</Button>
