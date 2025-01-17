<script>
  import { SignIn, SignOut } from '@auth/sveltekit/components'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { REDIRECT_AUTHENTIFIED_USER } from '$lib/config'
  import { goto } from '$app/navigation'

  onMount(() => {
    if ($page.data.session) {
      goto(REDIRECT_AUTHENTIFIED_USER)
    }
  })
</script>

<h1>SvelteKit Auth Example</h1>
<div>
  <SignIn>
    <div slot="submitButton" class="buttonPrimary">Sign in</div>
  </SignIn>
</div>
