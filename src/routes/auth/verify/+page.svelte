<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (user?.id) {
			window.location.href = `/${user.id}`;
		}
	});
</script>

<h1 class="text-3xl text-white">Your email is verified</h1>
<p>Preparing your workspace</p>
