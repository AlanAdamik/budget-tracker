import { writable } from 'svelte/store'

export function tableSelectionStore() {
  const selection = writable<string[]>([])
  const { subscribe, set, update } = selection
  return {
    subscribe,
    set,
    update,
    toggle: (item: string) =>
      update((items) => {
        const index = items.indexOf(item)
        if (index === -1) {
          return [...items, item]
        } else {
          return [...items.slice(0, index), ...items.slice(index + 1)]
        }
      }),
  }
}
