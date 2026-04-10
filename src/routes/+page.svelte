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

<div class="-z-index-5 mt-8 flex grow flex-row gap-x-4 p-4 opacity-50">
	<div class="card">
		<h1>TFT Screens - OLED vs TFT</h1>
		<Skeleton Maxwidth={400} height="1.5rem" count={3}></Skeleton>
	</div>

	<div class="card">
		<h1>How to boost converter</h1>
		<Skeleton Maxwidth={400} height="1.5rem" count={3}></Skeleton>
	</div>

	<div class="card">
		<h1>Supabase + Svelte Kit</h1>
		<Skeleton Maxwidth={400} height="1.5rem" count={3}></Skeleton>
	</div>
</div>

<div class="mt-4 flex items-center justify-center p-4">
	<div class="flex w-full max-w-[600px] flex-1 flex-col pt-5">
		<Skeleton Maxwidth={800} height="4rem"></Skeleton>
		<Skeleton Maxwidth={800} height="20rem"></Skeleton>
	</div>

	<div class="inset-0 flex max-w-[50%] flex-col px-8">
		<h1>Type anything & Everything ...</h1>
		<p class="pt-4 pr-4">
			Your imagination is your limit. You can document how to start a sveltekit project, how to
			detect objects using rassbery pi camera, how to fix latency issues in remote functions, and so
			and so fourth. Your ideas/note will be show to the community and youll recieve alot of dots if
			it is helpful!
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
