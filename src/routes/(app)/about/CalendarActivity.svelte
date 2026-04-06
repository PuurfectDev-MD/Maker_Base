<script lang="ts">
	import { scaleThreshold } from 'd3-scale';
	import { timeYear } from 'd3-time';
	import { Calendar, Chart, Layer, Tooltip } from 'layerchart';
	import { endOfInterval } from '@layerstack/utils';

	let { data } = $props();
	const now = new Date();
	const firstDayOfYear = timeYear.floor(now);
	const lastDayOfYear = endOfInterval('year', now);

	const dataForCalendar = data;
	console.log(dataForCalendar);
</script>

<Chart
	data={dataForCalendar}
	x="date"
	c="value"
	cScale={scaleThreshold()}
	cDomain={[1, 2, 3]}
	cRange={[
		'var(--color-calendar-100)',
		'var(--color-calendar-300)',
		'var(--color-calendar-500)',
		'var(--color-calendar-700)'
	]}
	padding={{ top: 20, left: 20 }}
	height={240}
>
	{#snippet children({ context })}
		<Layer type="html">
			<Calendar start={firstDayOfYear} end={lastDayOfYear}>
				{#snippet children({ cells, cellSize })}
					{#each cells as cell}
						<div
							class="absolute p-px"
							style:left="{cell.x}px"
							style:top="{cell.y}px"
							style:width="{cellSize[0]}px"
							style:height="{cellSize[1]}px"
							onpointermove={(e) => context.tooltip?.show(e, cell.data)}
							onpointerleave={(e) => context.tooltip?.hide()}
						>
							<div
								class="h-full w-full rounded-sm"
								style:background-color={cell.color ?? 'rgb(255 255 255 / 10%)'}
							></div>
						</div>
					{/each}
				{/snippet}
			</Calendar>
		</Layer>

		<Tooltip.Root>
			{#snippet children({ data })}
				<Tooltip.Header value={data.date} format="day" />
				{#if data.value != null}
					<Tooltip.List>
						<Tooltip.Item label="value" value={data.value} format="integer" valueAlign="right" />
					</Tooltip.List>
				{/if}
			{/snippet}
		</Tooltip.Root>
	{/snippet}
</Chart>
