<script lang="ts">
  import { cva } from 'class-variance-authority'

  export let level: '1' | '2' | '3' | '4' | '5' | '6' = '1'

  const headingStyle = cva('flex items-center gap-2', {
    variants: {
      level: {
        '1': 'mb-6 text-xl',
        '2': 'flex text-lg',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
      },
    },
  })
</script>

<h2 class={headingStyle({ level })}>
  <slot />
</h2>
