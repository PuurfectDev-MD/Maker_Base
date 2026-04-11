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

<div class="flex flex-col justify-center justify-items-center">
	<h1 class="p-4 text-3xl text-white">Your email is verified</h1>
	<p class="p-2">Preparing your workspace</p>
	<h1 class="p-2">Cant login?</h1>
	<a
		href="/auth/login"
		class=" rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
		>Login</a
	>
</div>
