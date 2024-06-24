<script lang="ts" generics="T extends string">
  import Button from '$lib/components/ui/button/button.svelte'
  import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte'
  import * as Command from '$lib/components/ui/command'
  import * as Popover from '$lib/components/ui/popover'
  import { cn } from '$lib/utils'
  import Check from 'lucide-svelte/icons/check'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import { tick } from 'svelte'

  export let value: T
  export let options: {
    label: string
    id: T
  }[]

  let open = false

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false
    tick().then(() => {
      document.getElementById(triggerId)?.focus()
    })
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      class="w-[200px] justify-between"
      builders={[builder]}
      role="combobox"
      variant="outline"
    >
      {value}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content align="center" avoidCollisions={false} side="top">
    <Command.Root>
      <Command.Input placeholder="Search Bank..." />
      <Command.List>
        <ScrollArea class="h-48">
          <Command.Empty>No bank found.</Command.Empty>
          <Command.Group>
            {#each options as item}
              <Command.Item
                onSelect={() => {
                  value = item.id
                  closeAndFocusTrigger(ids.trigger)
                }}
                value={item.id}
              >
                <Check class={cn('mr-2 h-4 w-4', value !== item.id && 'text-transparent')} />
                {item.label}
              </Command.Item>
            {/each}
          </Command.Group>
        </ScrollArea>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
