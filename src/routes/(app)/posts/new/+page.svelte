<script lang="ts">
	import { createPost } from '../posts.remote';
</script>

<h1>New post</h1>

<form {...createPost}>
	<label>
		<input {...createPost.fields.title.as('text')} /> Title
	</label>
	<label>
		<input {...createPost.fields.isPublic.as('checkbox')} checked /> Public
	</label>

	<label>
		<h1>Make sure its detailed</h1>
		<textarea {...createPost.fields.content.as('text')} class="bg-white text-black"></textarea>
	</label>

	<button type="submit" class="cursor-pointer">Save</button>
</form>

{#if createPost.result?.error}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg transition-all md:right-[-2rem] md:bottom-[80%] md:h-[10vh] md:w-[40%]"
	>
		<p class="px-8 py-4 text-xl md:text-2xl">{createPost.result.error}</p>
	</div>
{/if}
