<script lang="ts">
	import Skeleton from './Skeleton.svelte';
</script>

<!-- 
AI Generated -->

<!-- Title: "Hello, username" -->
<div class="mt-4 p-3">
	<Skeleton width="40%" height="4.5rem" />
</div>

<!-- Subtitle -->
<div class="px-4 py-2">
	<Skeleton width="35%" height="1.2rem" />
</div>

<!-- 4 stat cards -->
<div class="mt-4 flex max-w-full justify-evenly p-3">
	{#each Array(4) as _}
		<div class="card w-1/5">
			<Skeleton width="60%" height="4rem" />
			<Skeleton width="80%" height="1rem" />
		</div>
	{/each}
</div>

<!-- CTA banner -->
<div
	class="mx-4 my-6 flex max-w-full items-center justify-between rounded-lg bg-[var(--bg-card)] px-4 py-6"
>
	<div class="flex w-1/2 flex-col gap-y-2">
		<Skeleton width="70%" height="1.5rem" />
		<Skeleton width="90%" height="1rem" />
	</div>
	<Skeleton width="80px" height="2.25rem" />
</div>

<!-- Section heading -->
<div class="mt-6 px-8 py-2">
	<Skeleton width="20%" height="1.2rem" />
</div>

<!-- Note cards row -->
<div class="flex max-w-full px-4 py-2">
	{#each Array(3) as _}
		<div class="card mx-4 flex h-full flex-col" style="min-width: 200px; flex:1">
			<Skeleton width="85%" height="1.5rem" />
			<Skeleton width="100%" height="1rem" />
			<Skeleton width="90%" height="1rem" />
			<div class="mt-7 flex flex-row justify-between">
				<Skeleton width="40%" height="0.9rem" />
				<Skeleton width="20%" height="0.9rem" />
			</div>
		</div>
	{/each}
</div>

<!-- Tags section -->
<div class="mt-4 mb-6 bg-[var(--bg-card)] pb-3 opacity-50">
	<div class="my-4 flex items-center gap-3 px-4">
		<Skeleton width="80px" height="1.2rem" />
		{#each Array(4) as _}
			<Skeleton width="60px" height="2rem" />
		{/each}
	</div>
</div>
