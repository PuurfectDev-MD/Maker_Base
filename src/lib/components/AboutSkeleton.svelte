<script lang="ts">
	import Skeleton from './Skeleton.svelte';

	let { showChart = false, showCalendar = false } = $props();
</script>

{#if showChart}
	<div style="padding: 1rem; margin-top: 1.5rem;">
		<Skeleton height="18rem"></Skeleton>
	</div>
{/if}

{#if showCalendar}
	<div style="padding: 1rem; margin-top: 1.5rem;">
		<Skeleton height="18rem"></Skeleton>
	</div>
{/if}
