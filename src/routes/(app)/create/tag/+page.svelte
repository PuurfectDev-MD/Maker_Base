<script lang="ts">
	import { addNewTag, getUserTags } from '../../user.remote';

	let { data } = $props();
	let addNew = $state(false);
</script>

{#await getUserTags(data.user.id)}
	<p>Loading</p>
{:then tags}
	{#if tags.all.length > 0}
		<div class="mt-4 mb-6 bg-[var(--bg-card)] py-5 pb-3">
			<div class="my-4 flex items-center justify-center">
				<h2 class="px-4">Recent:</h2>
				{#each tags.recent as tag}
					<div class="tag rounded bg-gray-200 px-3 py-1">
						<h3>{tag.name}</h3>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-5 bg-[var(--bg-card)] py-8">
			<div class="flex justify-between px-2">
				<div>
					<h1>All Tags</h1>
				</div>
				<div class=" mr-3 flex justify-end">
					<button onclick={() => (addNew = !addNew)} class="m-2">Add new</button>
				</div>
			</div>

			<div class="flex items-center justify-center">
				{#each tags.all as tag}
					<div class="tag">
						<h3>{tag.name}</h3>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="mt-5 flex justify-between p-4 px-2">
			<div>
				<h1>No Tags</h1>
				<p>Add one!</p>
			</div>
			<div class=" mr-3 flex justify-end">
				<button onclick={() => (addNew = !addNew)} class="m-2">Add new</button>
			</div>
		</div>
	{/if}
{/await}

{#if addNew}
	<div class="mt-3 bg-[var(--bg-card)] p-4">
		<form {...addNewTag}>
			<div class="flex justify-between">
				<label>
					Name:
					<input class="input-description mx-4" {...addNewTag.fields.name} name="name" />
				</label>

				<button type="submit">Add</button>
			</div>
		</form>
	</div>
{/if}

{#if addNewTag.result?.type == 'db_error'}
	<p>There was a db error</p>
{/if}
