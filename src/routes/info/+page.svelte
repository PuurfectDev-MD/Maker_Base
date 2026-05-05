<script lang="ts">
	let { data } = $props();
	let activeId = $state(data.headings[0]?.id ?? '');

	function handleNavClick(id: string) {
		activeId = id;
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<div
	class="min-h-screen bg-[var(--bg-page)] p-6"
	style="background-image: var(--bg-texture); background-size: var(--bg-texture-size, auto);"
>
	<div class="mx-auto max-w-5xl overflow-hidden rounded-lg border border-[var(--border-strong)]">
		<!-- title bar -->
		<div class="flex items-center gap-3 bg-[var(--text-primary)] px-4 py-3">
			<div class="flex gap-1.5">
				<div class="h-3 w-3 rounded-full bg-[#E24B4A]"></div>
				<div class="h-3 w-3 rounded-full bg-[#EF9F27]"></div>
				<div class="h-3 w-3 rounded-full bg-[#639922]"></div>
			</div>
			<div class="flex-1 text-center font-mono text-xs tracking-widest text-[var(--text-muted)]">
				README.md — Maker Base
			</div>
			<div class="w-[54px]"></div>
		</div>

		<!-- body -->
		<div class="grid" style="grid-template-columns: 200px 1fr;">
			<!-- sidebar -->
			<aside
				class="sticky top-0 h-full overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-card)] py-3"
			>
				<p
					class="mb-2 px-3.5 font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase"
				>
					Contents
				</p>

				{#each data.headings as heading}
					<button
						class="flex w-full items-center gap-2 border-l-[2.5px] py-1.5 pr-3 font-mono text-[11px] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-card-hover)]"
						style="
							padding-left: {heading.level === 1 ? 14 : heading.level === 2 ? 22 : 32}px;
							border-left-color: {activeId === heading.id ? 'var(--accent)' : 'transparent'};
							background: {activeId === heading.id ? 'var(--accent-soft)' : 'transparent'};
							color: {activeId === heading.id ? 'var(--text-primary)' : 'var(--text-secondary)'};
							font-weight: {activeId === heading.id ? 700 : 400};
						"
						onclick={() => handleNavClick(heading.id)}
					>
						<div
							class="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-secondary)]"
							style="opacity: {activeId === heading.id ? 1 : 0.4};"
						></div>
						<span class="text-left leading-snug">{heading.text}</span>
					</button>
				{/each}

				<div class="mx-3.5 my-2.5 border-t border-[var(--border)]"></div>
				<p
					class="mb-2 px-3.5 font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase"
				>
					Links
				</p>

				<a
					href="https://github.com/PuurfectDev-MD/Maker_Base"
					class="flex w-full items-center gap-2 border-l-[2.5px] border-transparent py-1.5 pr-3 pl-3.5 font-mono text-[11px] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-card-hover)]"
				>
					<div
						class="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-secondary)] opacity-40"
					></div>
					<span>GitHub</span>
					<svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="ml-auto opacity-40">
						<path
							d="M1 7L7 1M7 1H3M7 1V5"
							stroke="currentColor"
							stroke-width="1.2"
							stroke-linecap="round"
						/>
					</svg>
				</a>
			</aside>

			<!-- content -->
			<div class="overflow-hidden bg-[var(--bg-page)] px-9 py-7">
				<!-- doc header -->
				<div class="mb-6 border-b border-[var(--border)] pb-5">
					<h1 class="mb-2 font-mono text-2xl font-bold text-[var(--text-primary)]">Maker Base</h1>
					<div class="flex flex-wrap gap-4">
						<span class="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
							<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
								<circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1" />
								<path
									d="M5 3v2l1.5 1.5"
									stroke="currentColor"
									stroke-width="1"
									stroke-linecap="round"
								/>
							</svg>
							Open source
						</span>

						<span class="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
							<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
								<circle cx="5" cy="3" r="1.5" stroke="currentColor" stroke-width="1" />
								<path
									d="M2 9c0-1.66 1.34-3 3-3s3 1.34 3 3"
									stroke="currentColor"
									stroke-width="1"
								/>
							</svg>
							By a Maker, for Makers
						</span>
					</div>
				</div>

				<!-- readme body -->
				<div class="readme-body">
					{@html data.content}
				</div>
			</div>
		</div>

		<!-- status bar -->
		<div class="flex items-center gap-4 bg-[var(--text-primary)] px-4 py-1.5">
			<div
				class="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[var(--text-muted)]"
			>
				<div class="h-1.5 w-1.5 rounded-full bg-[var(--tag-green)]"></div>
				README.md
			</div>
			<span class="font-mono text-[9px] tracking-widest text-[var(--text-muted)]">Markdown</span>
			<span class="font-mono text-[9px] tracking-widest text-[var(--text-muted)]">UTF-8</span>
			<span class="ml-auto font-mono text-[9px] tracking-widest text-[var(--text-muted)]">
				{data.headings.length} sections
			</span>
		</div>
	</div>
</div>

<svelte:head>
	<style>
		.readme-body h1,
		.readme-body h2,
		.readme-body h3 {
			font-family: var(--font-body);
			color: var(--text-primary);
			scroll-margin-top: 1rem;
		}
		.readme-body h1 {
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0 0 12px;
			padding-bottom: 8px;
			border-bottom: 1px solid var(--border);
		}
		.readme-body h2 {
			font-size: 0.95rem;
			font-weight: 700;
			margin: 24px 0 8px;
		}
		.readme-body h3 {
			font-size: 0.85rem;
			font-weight: 700;
			margin: 16px 0 6px;
			opacity: 0.75;
		}
		.readme-body p {
			font-size: 0.9rem;
			font-family: var(--font-body);
			color: var(--text-secondary);
			line-height: 1.8;
			margin-bottom: 12px;
		}
		.readme-body ul,
		.readme-body ol {
			margin: 0 0 14px;
			padding: 0;
			list-style: none;
		}
		.readme-body li {
			font-size: 0.8rem;
			font-family: var(--font-body);
			color: var(--text-secondary);
			line-height: 1.75;
			padding: 3px 0 3px 16px;
			position: relative;
		}
		.readme-body li::before {
			content: '—';
			position: absolute;
			left: 0;
			color: var(--text-muted);
		}
		.readme-body code {
			background: var(--bg-code);
			border: 1px solid var(--border);
			border-radius: 2px;
			padding: 1px 6px;
			font-size: 0.7rem;
			font-family: var(--font-mono);
			color: var(--text-primary);
		}
		.readme-body pre {
			background: var(--bg-code);
			border: 1px solid var(--border);
			border-radius: 4px;
			padding: 12px 16px;
			margin-bottom: 14px;
			overflow-x: auto;
		}
		.readme-body pre code {
			background: none;
			border: none;
			padding: 0;
			font-size: 0.75rem;
			line-height: 1.7;
		}
		.readme-body blockquote {
			border-left: 3px solid var(--accent);
			padding: 8px 14px;
			background: var(--accent-soft);
			margin: 0 0 14px;
		}
		.readme-body blockquote p {
			margin: 0;
		}
		.readme-body a {
			color: var(--accent);
			text-decoration: underline;
			text-underline-offset: 2px;
		}
		.readme-body hr {
			border: none;
			border-top: 1px solid var(--border);
			margin: 20px 0;
		}
		.readme-body strong {
			font-weight: 700;
			color: var(--text-primary);
		}
		.readme-body table {
			width: 100%;
			border-collapse: collapse;
			margin-bottom: 16px;
			font-size: 0.75rem;
		}
		.readme-body th {
			background: var(--bg-card);
			color: var(--text-primary);
			font-weight: 700;
			padding: 7px 12px;
			text-align: left;
			border: 1px solid var(--border);
			font-family: var(--font-mono);
			font-size: 0.65rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
		.readme-body td {
			padding: 7px 12px;
			border: 1px solid var(--border);
			color: var(--text-secondary);
			font-family: var(--font-body);
		}
		.readme-body tr:nth-child(even) td {
			background: var(--bg-card);
		}
	</style>
</svelte:head>
