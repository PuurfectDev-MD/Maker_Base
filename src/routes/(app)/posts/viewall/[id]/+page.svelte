<script lang="ts">
	import { getPublicPostByUser, getPrivatePostByUser } from '../../posts.remote';

	let { data } = $props();
	import { ArrowRightIcon, TrashIcon, DotOutlineIcon, NotePencilIcon } from 'phosphor-svelte';

	async function deletePost() {}
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
								<a class="px-2"><DotOutlineIcon size={28}></DotOutlineIcon></a>
								<p>{post.dots_count}</p>
							</div>

							<a class=" cursor-pointer hover:scale-110"
								><NotePencilIcon size={24}></NotePencilIcon></a
							>
						</div>
						<div class="flex justify-between">
							<p class="">{post.created_at}</p>

							<a class=" cursor-pointer hover:scale-110" onclick={deletePost}
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

							<a class=" cursor-pointer hover:scale-110"
								><NotePencilIcon size={24}></NotePencilIcon></a
							>
						</div>
						<div class="flex justify-between">
							<p class="">{post.created_at}</p>

							<a class=" cursor-pointer hover:scale-110" onclick={deletePost}
								><TrashIcon size={24}></TrashIcon>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{/await}
