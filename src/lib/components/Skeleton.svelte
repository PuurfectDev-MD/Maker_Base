<script lang="ts">
	let { Maxwidth = 150, height = '1rem', count = 1 } = $props();
	function getWidth(i: number) {
		if (i > 1) {
			if (i % 3 === 0) return Maxwidth * 0.85;
			if (i % 2 === 0) return Maxwidth * 0.7;
			return Maxwidth * 0.9;
		}
		return i;
	}
</script>

{#each Array(count) as _}
	<div style="width:{getWidth(Maxwidth)}px; height: {height}" class="skeleton"></div>
{/each}

<style>
	.skeleton {
		box-sizing: border-box;
		margin-top: 0.75rem;
		border-radius: 4px;
		background: linear-gradient(
			90deg,
			var(--accent-soft) 25%,
			var(--bg-card-hover) 50%,
			var(--accent-soft) 75%
		);
		background-size: 400% 100%;
		animation: shimmer 1.8s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: 0% 0;
		}
	}
</style>
