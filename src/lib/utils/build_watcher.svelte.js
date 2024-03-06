export default class BuildWatcher {
	constructor() {}

	/** @type {"queued" | "in_progress" | "completed"} */
	status = $state('completed');

	/** @type {"success" | "failure" | null} */
	conclusion = $state(null);

	fetching = $state(false);

	url =
		'https://api.github.com/repos/shellakybookies-site/shellakybookies-site/actions/workflows/deploy.yml/runs';

	async update() {
		try {
			this.fetching = true;
			const response = await fetch(this.url);
			if (response.ok) {
				/** @type {Github.ActionRuns}*/
				const runs = await response.json();
				if (runs.total_count > 0 && runs.workflow_runs?.length) {
					this.status = runs.workflow_runs[0].status;
					this.conclusion = runs.workflow_runs[0].conclusion;
					if (['queued', 'in_progress'].includes(this.status)) {
						// if it looks like it's building, wait 5 seconds and try again
						setTimeout(this.update.bind(this), 5000);
					}
				}
			}
		} finally {
			this.fetching = false;
		}
	}
}
