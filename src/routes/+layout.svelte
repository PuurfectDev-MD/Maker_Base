<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { supabase } from '$lib/supabase.js';
	import { goto, invalidateAll } from '$app/navigation';

	import { UserIcon, ListIcon } from 'phosphor-svelte';

	let { children, data } = $props();
	const themes = ['warm', 'chalkboard', 'blueprint'];
	let theme = $state(data.theme || 'warm');

	async function saveTheme(newTheme: string) {
		document.cookie = `user-theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
		await invalidateAll();
	}
	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	});

	let error_message = $state('');
	let navOpen = $state(false);
	let sidebar = $state(false);

	async function logout() {
		const { error } = await supabase.auth.signOut();

		if (error) {
			error_message = 'There was an error while logging out. Try again';
			return;
		}

		await invalidateAll();
		goto('/');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="hidden grid-cols-3 items-center p-4 md:grid">
	<div></div>
	<div class="flex flex-row justify-center gap-x-8 text-2xl">
		<a href="/">Home</a>
		<a href="/explore">Explore</a>
		<a href="/create">Create</a>
		{#if data.user?.id}
			<a href="/community">Community</a>
		{:else}
			<a href="/info">Info</a>
		{/if}
	</div>

	<div class="flex justify-end gap-x-3.5">
		<select
			bind:value={theme}
			onchange={(e) => {
				saveTheme(e.currentTarget.value);
			}}
			class=" appearance-none border-0 border-b-2 border-black bg-[var(--bg-card)] pr-10 outline-none"
		>
			{#each themes as t}
				<option value={t} class="p-2 text-center">{t}</option>
			{/each}
		</select>
		{#if !data.user}
			<a
				href="/auth/signup"
				class=" rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
				>Signup</a
			>
		{:else}
			<button class="cursor-pointer p-3" onclick={() => (sidebar = !sidebar)}
				><UserIcon size={24} /></button
			>
			{#if sidebar}
				<div
					class="absolute top-[10vh] right-10 flex flex-col gap-y-2 bg-[var(--bg-card)] p-4"
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

<nav class="mobile-nav relative w-full md:hidden">
	<div class="flex justify-between p-3">
		<button onclick={() => (navOpen = !navOpen)}><ListIcon size={38}></ListIcon></button>

		<div>
			{#if !data.user}
				<a
					href="/auth/signup"
					class=" rounded-[4px] border border-[var(--primary-color)] px-3 py-2 no-underline! hover:bg-[var(--bg-card)]"
					>Signup</a
				>
			{:else}
				<button class="cursor-pointer p-3" onclick={() => (sidebar = !sidebar)}
					><UserIcon size={38} /></button
				>
				{#if sidebar}
					<div
						class="absolute top-[10vh] right-10 flex flex-col gap-y-2 bg-[var(--bg-card)] p-4"
						onmouseleave={() => (sidebar = !sidebar)}
					>
						<a href="/about">You</a>
						<a href="/setting">Setting</a>
						<a onclick={logout} href="/auth/login">Logout</a>
					</div>
				{/if}
			{/if}
		</div>
	</div>

	{#if navOpen}
		<div
			class="absolute inset-x-0 z-40 mx-2 mb-2 flex max-h-screen flex-col items-start gap-y-4 rounded-2xl px-6"
			onclick={() => (navOpen = false)}
		>
			<a href="/">Home</a>
			<a href="/explore">Explore</a>
			<a href="/info">Info</a>
			<a href="/auth/signup">Signup</a>

			<div class="pt-4" onclick={(e) => e.stopPropagation()}>
				<select
					bind:value={theme}
					onchange={(e) => {
						saveTheme(e.currentTarget.value);
					}}
					class=" appearance-none border-0 border-b-2 border-black bg-[var(--bg-card)] pr-10 outline-none"
				>
					{#each themes as t}
						<option value={t} class="p-2 text-center">{t}</option>
					{/each}
				</select>
			</div>
		</div>
	{/if}
</nav>
<main
	class="w-full max-w-full overflow-x-hidden px-4 {navOpen
		? 'pointer-events-none blur-2xl'
		: ''} transition-all"
>
	{@render children()}
</main>
