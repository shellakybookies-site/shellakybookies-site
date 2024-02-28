/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const date_files = import.meta.glob('$lib/content/dates/*.md');
	const dates = Object.keys(date_files).map((path) =>
		path.split('/').slice(-1)[0].replace('.md', '')
	);
	return {
		dates
	};
};
