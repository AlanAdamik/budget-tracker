<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div>Dashboard</div>
<div>
  <p>Welcome to your dashboard {data.session.user.name} !</p>
</div>
