<script lang="ts">
	import Skeleton from './Skeleton.svelte';
</script>

<div class="grid min-h-screen grid-cols-3 items-stretch gap-8 p-4">
	{#each Array(6) as _}
		<div class="card flex h-full max-h-[15rem] flex-col p-4">
			<Skeleton height="5rem"></Skeleton>

			<div class="mt-5 flex flex-row justify-between">
				<Skeleton height="2rem"></Skeleton>
			</div>
			<div class="mx-4 flex justify-between gap-x-4">
				<Skeleton height="2rem"></Skeleton>
				<Skeleton height="2rem"></Skeleton>
			</div>
		</div>
	{/each}
</div>
