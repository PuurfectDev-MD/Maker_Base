<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
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
			<a href="/auth/login">Log Out</a>
		{/if}
	</div>
</nav>
{@render children()}
