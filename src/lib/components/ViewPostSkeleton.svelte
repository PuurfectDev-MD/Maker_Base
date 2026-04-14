<script>
	import Skeleton from './Skeleton.svelte';
</script>

<div class="flex w-full flex-row items-center justify-between p-4">
	<Skeleton class="p-2" height="3rem"></Skeleton>
</div>
<div class="p-6">
	<Skeleton height="20rem"></Skeleton>
</div>
<div class="flex max-w-full flex-col">
	<div class="flex flex-row justify-end p-2 pr-8">
		<Skeleton height="3rem"></Skeleton>
	</div>
	<div class="flex flex-row justify-end">
		<Skeleton width="10%" class="pb-4"></Skeleton>
	</div>
</div>
