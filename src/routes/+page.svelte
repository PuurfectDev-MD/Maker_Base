<script lang="ts">
	import Skeleton from '$lib/components/Skeleton.svelte';

	let { data } = $props();
</script>

<div class="main mt-10 flex w-screen flex-col items-center md:mt-20">
	<h1 class="hidden text-3xl md:block md:text-5xl">Your Maker Stuff,</h1>
	<h1 class="block text-3xl md:hidden md:text-5xl">Creation,</h1>
	<h1 class="block text-3xl md:hidden md:text-5xl">& Ideas</h1>
	<h1 class="block text-3xl md:hidden md:text-5xl">for forever</h1>
	<h1 class="hidden text-3xl md:block md:text-5xl">Documented for forever</h1>

	<p class="mt-8 max-w-md text-center">
		Write, explore detailed notes and revist components, concepts, how-to-do-expanations all at one
		place :)
	</p>
</div>

<div class="mt-8 flex justify-center">
	<div class="group flex flex-col">
		<a href="/explore" class="mx-4 border-2 p-3 text-center no-underline! hover:bg-[var(--bg-card)]"
			>Browse public notes</a
		>
	</div>
	<div class="group flex flex-col">
		<a
			href="/auth/signup"
			class="hover:text- mx-4 border-2 p-3 text-center no-underline! hover:bg-[var(--bg-card)]"
			>Signup for free</a
		>
	</div>
</div>

<div class="mt-16 flex items-center gap-3 pt-4">
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
	<p class="shrink-0 text-sm text-[var(--text-muted)]">A taste of what's inside</p>
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
</div>

<!-- scrolling notes -->
{#await data.streamed.notes}
	<div class="overflow-hidden border-y border-[var(--border)] py-3">
		<div class="flex w-max gap-0">
			{#each Array(6) as _}
				<div class="flex flex-col gap-2 px-5">
					<div class="skeleton h-4 w-32 rounded"></div>
					<div class="skeleton h-3 w-16 rounded"></div>
				</div>
				<span class="self-center px-2 text-[var(--border-strong)]">·</span>
			{/each}
		</div>
	</div>
{:then fetchedNotes}
	{#if fetchedNotes && fetchedNotes.length > 0}
		<div class="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-card)] py-4">
			<div class="marquee-track flex w-max">
				{#each [...fetchedNotes, ...fetchedNotes] as note}
					<div class="flex flex-col px-6 whitespace-nowrap">
						<span class="text-[14px] font-semibold text-[var(--text-primary)]">
							{note.title}
						</span>
						<div class="mt-1">
							{#if note.tag_names && note.tag_names.length > 0}
								<span
									class="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] font-bold tracking-wider text-[var(--accent)] uppercase"
								>
									#{note.tag_names[0]}
								</span>
							{:else}
								<span class="text-[9px] text-[var(--text-muted)]">untagged</span>
							{/if}
						</div>
					</div>
					<span class="self-center px-2 text-[var(--border-strong)]">·</span>
				{/each}
			</div>
		</div>
	{/if}
{/await}

<!-- stats -->
{#await data.streamed.stats}
	<div class="grid grid-cols-3 divide-x divide-[var(--border)] border-t border-[var(--border)]">
		{#each Array(3) as _}
			<div class="flex flex-col items-center gap-2 px-6 py-5">
				<Skeleton width="4rem" height="2rem" />
				<Skeleton width="6rem" height="0.75rem" />
			</div>
		{/each}
	</div>
{:then result}
	<div
		class="grid grid-cols-3 divide-x divide-[var(--border)] border-t border-[var(--border)] pt-4"
	>
		<div class="flex flex-col items-center px-6 py-5">
			<span class="text-3xl font-bold text-[var(--text-primary)]">{result.total_posts ?? 0}</span>
			<span class="mt-1 font-sans text-[10px] tracking-widest text-[var(--text-muted)] uppercase"
				>Notes written</span
			>
		</div>
		<div class="flex flex-col items-center px-6 py-5">
			<span class="text-3xl font-bold text-[var(--text-primary)]">{result.total_tags ?? 0}</span>
			<span class="mt-1 font-sans text-[10px] tracking-widest text-[var(--text-muted)] uppercase"
				>Topics covered</span
			>
		</div>
		<div class="flex flex-col items-center px-6 py-5">
			<span class="text-3xl font-bold text-[var(--text-primary)]">{result.total_members ?? 0}</span>
			<span class="mt-1 font-sans text-[10px] tracking-widest text-[var(--text-muted)] uppercase"
				>Members</span
			>
		</div>
	</div>
{/await}

<div class="mt-4 flex flex-col gap-x-8 p-4 md:flex-row">
	<!-- Right-->
	<div class=" flex flex-1 flex-col justify-center px-8">
		<h1>Type anything & Everything ...</h1>
		<p class="hidden pt-4 pr-4 md:block">
			Your imagination is the limit. You can document how to start a sveltekit project, how to
			detect objects using Raspberry pi camera, how to fix latency issues in remote functions, and
			so and so fourth. Your ideas/note will be show to the community and youll recieve alot of dots
			if it is helpful!
		</p>

		<p class=" block pt-4 pr-4 md:hidden">Your imagination is the limit</p>
	</div>

	<!-- Left -->
	<div class="flex flex-1 flex-col pt-5">
		<Skeleton width="100%" height="4rem" />
		<Skeleton width="100%" height="20rem" />
	</div>
</div>
<div class="mt-16 flex items-center gap-3 pt-4">
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
	<p class="shrink-0 text-sm text-[var(--text-muted)]">Why use it?</p>
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
</div>

<div
	class="hover:none mt-8 flex w-full flex-col items-center gap-y-4 p-4 md:flex-row md:justify-evenly"
>
	<div class="card max-w-[400px]">
		<h1>Write it once</h1>
		<p class="pt-3">
			Document a part properly once and come back to whenver you are working with that same
			component. No more relearning how to use it
		</p>
	</div>
	<div class="card max-w-[400px]">
		<h1>Find Help</h1>
		<p class="pt-3">
			Stuck on a step? error? problem? Dont worry! The vast amount of notes on various topics got
			your back :)
		</p>
	</div>
	<div class="card max-w-[400px]">
		<h1>Community</h1>
		<p class="pt-3">
			Other people can get your notes (if you set it to public) and send you dots and suggestions!
			Amazing way to learn, grow and better your understanding of a concept.
		</p>
	</div>
</div>

<div class="flex flex-row justify-center p-4">
	<a
		href="/auth/signup"
		class=" rounded-[4px] border border-[var(--primary-color)] p-4 no-underline! hover:bg-[var(--bg-card)]"
		>Start Your Notebook</a
	>
</div>

<style>
	.marquee-track {
		animation: scroll 22s linear infinite;
	}
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
