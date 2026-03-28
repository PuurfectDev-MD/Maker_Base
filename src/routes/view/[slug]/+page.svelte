<script lang="ts">
	import CommentSection from './CommentSection.svelte';
	let { data } = $props();
</script>

{#if data.type == 'success'}
	<div class="flex w-full flex-row items-center gap-y-5 bg-amber-600 p-8">
		<h1>{data.post.title}</h1>
		<h2>{data.post.slug}</h2>
		<button class="ml-auto">Edit</button>
	</div>
	<div>
		{@html data.post.content}
	</div>
{:else if data.type == 'db_error'}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{data.message}</p>
	</div>
{:else if data.type == 'unauthorized'}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{data.message}</p>
	</div>
{/if}

<CommentSection {data}></CommentSection>
