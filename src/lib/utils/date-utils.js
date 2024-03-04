/**
 * @param {Date} date
 * @returns {Date | undefined}
 * */
export function in_calgary(date) {
	return new Date(
		date.toLocaleString('en-US', { timeZone: 'America/Edmonton' })
	);
}

/** @param {number} number */
export function two_digit_str(number) {
	return number.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false
	})
}

/** @param {Date} date */
export function formate_date(date) {
	const year = date.getFullYear();
	const month = two_digit_str(date.getMonth() + 1);
	const day = two_digit_str(date.getDate());
	return `${year}-${month}-${day}`;
}

