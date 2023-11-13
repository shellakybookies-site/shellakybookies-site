import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			green: {
				50: '#F5F5F0',
				100: '#E9EBE0',
				200: '#D0D8C0',
				300: '#B4C9A1',
				400: '#91B87F',
				500: '#67A85C',
				600: '#468B48',
				700: '#366D40',
				800: '#244C32',
				900: '#132A1F',
				950: '#0A150E'
			},
			gold: {
				50: '#FEF8EB',
				100: '#FBEED6',
				200: '#F2DEB5',
				300: '#E5CA94',
				400: '#D5B676',
				500: '#C09C53',
				600: '#9B804A',
				700: '#8A6D33',
				800: '#755A24',
				900: '#564115',
				950: '#412F0B'
			},
			red: {
				50: '#FCEFEE',
				100: '#F7DCD9',
				200: '#EDADA6',
				300: '#DE6A5C',
				400: '#DB5B4D',
				500: '#D64433',
				600: '#C73828',
				700: '#AA3022',
				800: '#942A1E',
				900: '#6A1E15',
				950: '#48140F'
			},
			neutral: {
				50: '#FCFCFC',
				100: '#F0F0F0',
				200: '#D5D6D8',
				300: '#B9BDC0',
				400: '#9AA1A8',
				500: '#7C8893',
				600: '#626E79',
				700: '#4A555F',
				800: '#323B43',
				900: '#191C20',
				950: '#0E0F11'
			}
		},
		extend: {},
		fontFamily: {
			sans: '"Vesper Libre", sans-serif',
			serif: '"Metamorphous", serif'
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addBase, theme }) {
			addBase({
				h1: {
					fontSize: theme('fontSize.2xl'),
					fontFamily: theme('fontFamily.serif')
				},
				h2: {
					fontSize: theme('fontSize.xl'),
					fontFamily: theme('fontFamily.serif')
				},
				h3: {
					fontSize: theme('fontSize.lg'),
					fontFamily: theme('fontFamily.serif')
				}
			});
		})
	]
};
