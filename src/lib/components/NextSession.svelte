<script>
	import { page } from '$app/stores';
	// import { Date } from 'svelte/reactivity';

	let dates = $state($page.data.dates);
	let components = $state($page.data.components);

	/** @param {string} name */
	function better_log(name) {
		/**
		 * @param {string} type
		 * @param {any} value
		 * */
		return (type, value) => {
			console.log(`${type}:${name}:`, value);
		};
	}

	let browser_now = $state();
	let calgary_now = $derived(browser_now && in_calgary(browser_now));
	$inspect(browser_now).with(better_log('browser_now'));
	$inspect(calgary_now).with(better_log('calgary_now'));

	/**
	 * @param {Date} date
	 * @returns {Date | undefined}
	 * */
	function in_calgary(date) {
		return new Date(
			date.toLocaleString('en-US', { timeZone: 'America/Edmonton' })
		);
	}

	/** @param {Date} date */
	function formate_date(date) {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	}

	/** @param {Date} date */
	function get_next_thursday(date) {
		// Make sure the input is a Date object
		if (!(date instanceof Date)) {
			throw new Error('Input must be a Date object');
		}

		// Get the day of the week (0-6)
		const dayOfWeek = date.getDay();

		// Calculate how many days to add to get to the next Thursday
		// If today is Thursday (4), don't add any days; otherwise, calculate the difference
		let daysToAdd = dayOfWeek === 4 ? 0 : (4 - dayOfWeek + 7) % 7;

		// Create a new Date object for the next Thursday
		const nextThursday = new Date(date);
		nextThursday.setDate(date.getDate() + daysToAdd);

		return nextThursday;
	}

	let today_formatted = $derived(calgary_now && formate_date(calgary_now));
	$inspect(today_formatted).with(better_log('today_formatted'));

	let next_thursday = $derived(
		calgary_now && formate_date(get_next_thursday(calgary_now))
	);
	$inspect(next_thursday).with(better_log('next_thrusday'));

	let dynamic_component = $derived(
		// @ts-ignore
		today_formatted && components[next_thursday]
	);

	$effect(() => {
		// grab date on load
		browser_now = new Date();
	});
</script>

<article>
	<h4 dir="rtl">Next Session: {next_thursday}</h4>
	{#if dynamic_component}
		<svelte:component this={dynamic_component} />
	{:else}
		<p>Same plans as usual</p>
	{/if}
</article>
