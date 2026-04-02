<script lang="ts">
	import { page } from '$app/state';
	import { getDots } from '../data.remote';
	let { data } = $props();
	let dotted = $state(false);

	let dotFetchPromise = $state(getDots(page.params.slug!));
</script>

{#await dotFetchPromise}
	<p>Loading dots</p>
{:then result}
	<div class="flex w-full max-w-full flex-col bg-amber-500">
		<div class="flex flex-row justify-end gap-x-3 p-4">
			<button class="cursor-pointer px-3 py-2 hover:scale-110 hover:bg-red-500"> . </button>
			<button class="cursor-pointer px-3 py-2 hover:scale-110 hover:bg-red-500"> ? </button>
		</div>
		<div class="flex flex-row justify-end">
			<h2 class="">{result.dotsCount}Dots</h2>
			<h2 class="">Plackt</h2>
		</div>
	</div>
{/await}
