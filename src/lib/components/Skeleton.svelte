<script lang="ts">
	let { width = '100%', height = '1rem', class: className = '' } = $props();
</script>

<div class="skeleton {className}" style="width:{width}; height:{height}"></div>

<style>
	.skeleton {
		border-radius: 4px;
		margin-top: 0.75rem;
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
