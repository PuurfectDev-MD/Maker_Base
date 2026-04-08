<script lang="ts">
	import CommentSection from './CommentSection.svelte';
	import ReactionSection from './ReactionSection.svelte';
	let { data } = $props();
</script>

{#if data.type == 'success'}
	<div class="flex w-full flex-row items-center justify-between p-4">
		<h1 class="p-2">{data.post.title}</h1>
		<button class="p-2">Edit</button>
	</div>
	<div class="p-6">
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

<ReactionSection {data}></ReactionSection>
<CommentSection {data}></CommentSection>
