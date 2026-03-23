<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { supabase } from '$lib/supabase.js';
	import { invalidateAll } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';

	let { children, data } = $props();
	let error_message = $state('');
	let sidebar = $state(false);
	async function logout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			error_message = 'There was an error while logging out. Try again';
		}

		await invalidateAll();
		redirect(303, '/');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="grid grid-cols-3 items-center p-4">
	<div></div>
	<div class="flex flex-row justify-center gap-x-8">
		<a href="/">Home</a>
		<a href="/explore">Explore</a>
		<a href="/create">Create</a>
		<a href="/info">Info</a>
	</div>

	<div class="flex justify-end pr-10">
		{#if !data.user}
			<a href="/auth/signup" class="rounded-2xl bg-green-400 p-2">Signup</a>
		{:else}
			<button class="cursor-pointer p-3" onclick={() => (sidebar = !sidebar)}>User</button>
			{#if sidebar}
				<div
					class="absolute top-[10vh] right-10 flex flex-col gap-y-2 bg-amber-400 p-4"
					onmouseleave={() => (sidebar = !sidebar)}
				>
					<a href="/about">You</a>
					<a href="/setting">Setting</a>
					<a onclick={logout} href="/auth/login">Logout</a>
				</div>
			{/if}
		{/if}
	</div>
</nav>
{@render children()}
