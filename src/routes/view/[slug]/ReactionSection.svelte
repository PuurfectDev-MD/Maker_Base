<script lang="ts">
	import { page } from '$app/state';
	import { getDots } from '../data.remote';
	import { addDots } from '../data.remote';
	let { data } = $props();
	let dotted = $state(false);
	let errorMsg = $state('');

	let dotFetchPromise = $state(getDots(page.params.slug!));

	async function sendDots() {
		const result = await addDots(page.params.slug!);

		if (result?.type !== 'success') {
			console.log(result?.message);
			errorMsg = result?.message ?? '';
			return;
		}

		dotted = true;
		dotFetchPromise = getDots(page.params.slug!);
	}
</script>

{#await dotFetchPromise}
	<p>Loading dots</p>
{:then result}
	<div class="flex w-full max-w-full flex-col bg-amber-500">
		<div class="flex flex-row justify-end gap-x-3 p-4">
			<button
				class="cursor-pointer px-3 py-2 hover:scale-110 hover:bg-red-500 {dotted
					? `bg-yellow-400`
					: ``}"
				onclick={sendDots}
			>
				.
			</button>
			<button class="cursor-pointer px-3 py-2 hover:scale-110 hover:bg-red-500"> ? </button>
		</div>
		<div class="flex flex-row justify-end">
			<h2 class="">{result.dotsCount + (dotted ? 1 : 0)}Dots</h2>
			<h2 class="">Plackt</h2>
		</div>
	</div>
{/await}

{#if errorMsg}
	<div
		class="fixed right-[-1rem] bottom-[8vh] w-[90%] animate-pulse rounded-lg bg-red-500 text-white shadow-lg"
	>
		<p class="px-8 py-4 text-xl">{errorMsg}</p>
	</div>
{/if}
