/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
	const { dates } = data;

	const components = {};

	for (const date of dates) {
		// @ts-ignore
		components[date] = (await import(`$lib/content/dates/${date}.md`)).default;
	}

	return {
		dates,
		components
	};
}
