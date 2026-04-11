<script lang="ts">
	import Skeleton from '$lib/components/Skeleton.svelte';
</script>

<div class="main mt-20 flex flex-col items-center">
	<h1>Your Maker Stuff,</h1>
	<h1>Documented for forever</h1>

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

<div class="mt-8 flex grow flex-row gap-x-4 p-4 opacity-50">
	{#each Array(3) as _}
		<div class="card flex-1">
			<Skeleton width="70%" height="1.5rem" />
			<Skeleton width="100%" height="1.5rem" />
			<Skeleton width="85%" height="1.5rem" />
			<Skeleton width="90%" height="1.5rem" />
		</div>
	{/each}
</div>
<div class="mt-4 flex flex-row gap-x-8 p-4">
	<!-- Left -->
	<div class="flex flex-1 flex-col pt-5">
		<Skeleton width="100%" height="4rem" />
		<Skeleton width="100%" height="20rem" />
	</div>

	<!-- Right-->
	<div class=" flex flex-1 flex-col justify-center px-8">
		<h1>Type anything & Everything ...</h1>
		<p class="pt-4 pr-4">
			Your imagination is your limit. You can document how to start a sveltekit project, how to
			detect objects using Raspberry pi camera, how to fix latency issues in remote functions, and
			so and so fourth. Your ideas/note will be show to the community and youll recieve alot of dots
			if it is helpful!
		</p>
	</div>
</div>
<div class="mt-16 flex items-center gap-3 pt-4">
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
	<p class="shrink-0 text-sm text-[var(--text-muted)]">Why use it?</p>
	<div class="h-px flex-grow bg-[var(--accent)]"></div>
</div>

<div class="hover:none mt-8 flex flex-row justify-evenly p-4">
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
			Other people cn get your notes (if you set it to public) and send you dots and suggestions!
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
