<script>
	import { createCalendar } from '@melt-ui/svelte';
	import { page } from '$app/stores';
	import { two_digit_str } from '$lib/utils/date-utils';
	// @ts-ignore
	import Placeholder from '$lib/content/placeholder.md';

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { months, headingValue, weekdays },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createCalendar();

	let open = false;
	/** @type {import('svelte').ComponentType?} */
	let dynamic_component;
	let selected_date = '';

	/** @param {{year: number, month: number, day: number}} date */
	function has_entry(date) {
		const year = date.year;
		const month = two_digit_str(date.month);
		const day = two_digit_str(date.day);
		const date_string = `${year}-${month}-${day}`;
		const found = $page.data.dates.includes(date_string);
		if (found) {
			return true;
		}
		return null;
	}

	/** @param {{year: number, month: number, day: number}} date */
	function is_thursday(date) {
		const date_obj = new Date(date.year, date.month - 1, date.day);
		const day = date_obj.getDay();
		return day === 4 ? true : null;
	}

	/** @param {PointerEvent} event */
	function click_handler(event) {
		event.stopPropagation();
		if (event.target instanceof HTMLElement) {
			const target = event.target;
			const date = target.dataset['value'];
			const has_entry = target.dataset['hasEntry'];
			const is_thursday = target.dataset['isThursday'];
			if (date && (has_entry || is_thursday)) {
				dynamic_component = has_entry
					? $page.data.components[date]
					: Placeholder;
				selected_date = date;
				open = true;
			}
		}
	}

	function close_dialog() {
		open = false;
		dynamic_component = null;
		selected_date = '';
	}

	/** @param {MouseEvent} event */
	function click_outside(event) {
		if (event.target === dialog) {
			close_dialog();
		}
	}

	/** @type {HTMLElement} */
	let dialog;
</script>

<svelte:window onclick={click_outside} />

<section class="calendar">
	<dialog {open} bind:this={dialog}>
		<article>
			<header>
				<button class="close" aria-label="Close" onclick={close_dialog}
				></button>
				<p>
					<strong>{selected_date}</strong>
				</p>
			</header>
			{#if dynamic_component}
				<svelte:component this={dynamic_component} />
			{/if}
		</article>
	</dialog>

	<div {...$calendar} use:calendar>
		<header role="group">
			<button {...$prevButton} use:prevButton>{'<'}</button>
			<div {...$heading} use:heading>
				{$headingValue}
			</div>
			<button {...$nextButton} use:nextButton>{'>'}</button>
		</header>
		{#each $months as month}
			<table {...$grid} use:grid>
				<thead aria-hidden="true">
					<tr>
						{#each $weekdays as day}
							<th>{day}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each month.weeks as weekDates}
						<tr>
							{#each weekDates as date}
								<td role="gridcell" aria-disabled={false}>
									<div
										{...$cell(date, month.value)}
										use:cell
										aria-disabled={false}
										data-has-entry={has_entry(date)}
										data-is-thursday={is_thursday(date)}
										on:m-click={click_handler}
									>
										{date.day}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</div>
</section>

<style>
	dialog article {
		max-height: 100dvh;
		overflow-y: scroll;
	}

	dialog article header {
		position: sticky;
		top: calc(var(--pico-block-spacing-vertical) * -1);
	}

	@media (max-width: 767px) {
		section {
			--pico-form-element-spacing-horizontal: 0.5rem;
			--pico-spacing: 0.5rem;
		}
	}
	@media (max-width: 388px) {
		section {
			--pico-form-element-spacing-horizontal: 0.4rem;
			--pico-spacing: 0.4rem;
		}
	}

	@media (max-width: 343px) {
		section {
			--pico-form-element-spacing-horizontal: 0.3rem;
			--pico-spacing: 0.3rem;
		}
	}

	[data-melt-calendar-heading] {
		flex-basis: 9rem;
		text-align: center;
		align-self: center;
	}

	th {
		text-align: center;
	}

	[data-outside-month] {
		background-color: var(--pico-color-jade-850);
		border-color: var(--pico-color-jade-850);
	}

	[data-today] {
		background-color: var(--pico-color-jade-300);
	}

	[data-is-thursday] {
		border-color: var(--pico-color-lime-150);
	}

	[data-has-entry] {
		background-color: var(--pico-color-lime-150);
	}

	[data-outside-month][data-has-entry] {
		background-color: var(--pico-color-lime-700);
	}

	[data-melt-calendar] {
		font-family: system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			Helvetica, Arial, 'Helvetica Neue', sans-serif,
			var(--pico-font-family-emoji);
	}

	:global(body:has(dialog[open])) {
		overflow: hidden;
	}
</style>
