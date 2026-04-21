<script lang="ts">
	import { getPublicPostByUser, getPrivatePostByUser, deletePost } from '../../posts.remote';

	let { data } = $props();
	let deleting = $state(false);
	let error = $state('');
	import { ArrowRightIcon, TrashIcon, DotOutlineIcon, NotePencilIcon } from 'phosphor-svelte';

	async function deleteUserPost(postId: string) {
		if (deleting) return;
		deleting = true;
		error = '';

		const result = await deletePost(postId);

		if (result.type !== 'success') {
			deleting = false;
			error = result.message;
		}

		window.location.reload();
		deleting = false;
	}
</script>

<div class="my-3 p-4">
	<h1 class="text-5xl!">Your Work</h1>
</div>

{#await getPublicPostByUser(data.user.id)}
	<p>Loading ...</p>
{:then result}
	{#if result.type == 'success'}
		<div class="my-2 px-4 py-2">
			<h2>Public</h2>
		</div>
		<div class=" mb-8 grid gap-x-4 gap-y-4 md:grid-cols-3">
			{#each result.post as post}
				<div class="card flex min-h-[250px] flex-col">
					<div class="flex justify-between">
						<h1>{post.title}</h1>
						<a href="/view/{post.slug}" class="cursor-pointer hover:scale-105">
							<ArrowRightIcon size={28}></ArrowRightIcon></a
						>
					</div>

					<h4 class="mt-auto py-3">{post.description}</h4>

					<div class="mt-auto flex flex-col gap-y-2">
						<div class="my-3 flex justify-between">
							<div class="flex">
								<DotOutlineIcon size={28}></DotOutlineIcon>
								<p>{post.dots_count}</p>
							</div>

							<a href="/create/update/{post.id}" class=" cursor-pointer hover:scale-110"
								><NotePencilIcon size={24}></NotePencilIcon></a
							>
						</div>
						<div class="flex justify-between">
							<p class="">{post.created_at}</p>

							<a
								class=" cursor-pointer hover:scale-110 {deleting
									? 'pointer-events-none opacity-50 grayscale'
									: ''}"
								onclick={() => deleteUserPost(post.id)}
								><TrashIcon size={24}></TrashIcon>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/await}

{#await getPrivatePostByUser(data.user.id)}
	<p>Loading ...</p>
{:then result}
	{#if result.type == 'success'}
		<div class="my-2 px-4 py-2">
			<h2>Private</h2>
		</div>
		<div class="grid-col-2 mb-8 grid gap-x-4 gap-y-4 md:grid-cols-3">
			{#each result.post as post}
				<div class="card flex min-h-[250px] flex-col">
					<div class="flex justify-between">
						<h1>{post.title}</h1>
						<a href="/view/{post.slug}" class="cursor-pointer hover:scale-105">
							<ArrowRightIcon size={28}></ArrowRightIcon></a
						>
					</div>

					<h4 class="mt-auto py-3">{post.description}</h4>

					<div class="mt-auto flex flex-col gap-y-2">
						<div class="my-3 flex justify-between">
							<div class="flex">
								<p>Private Post</p>
							</div>

							<a href="/create/update/{post.id}" class=" cursor-pointer hover:scale-110"
								><NotePencilIcon size={24}></NotePencilIcon></a
							>
						</div>
						<div class="flex justify-between">
							<p class="">{post.created_at}</p>

							<a
								class=" cursor-pointer hover:scale-110 {deleting
									? 'pointer-events-none opacity-50 grayscale'
									: ''}"
								onclick={() => deleteUserPost(post.id)}
								><TrashIcon size={24}></TrashIcon>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/await}

{#if deleting}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
		<div class="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-xl">
			<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--text-primary)]"></div>
			<p>Deleting post...</p>
		</div>
	</div>
{/if}

{#if error}
	<div
		class="fixed right-4 bottom-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
	>
		{error}
		<button onclick={() => (error = '')} class="ml-4 font-bold">X</button>
	</div>
{/if}
