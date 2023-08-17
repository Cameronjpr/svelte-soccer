<script lang="ts">
	import { Button, Container, Head, Hr, Html, Link, Preview, Section, Text } from 'svelte-email';

	const fontFamily =
		'-apple-system, BlinkMacSystemFont, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif;';

	const main = {
		backgroundColor: '#f2f2f2'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	};

	const header = {
		fontFamily,
		fontSize: '32px',
		lineHeight: '26px'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const btnContainer = {
		textAlign: 'center' as const
	};

	const button = {
		fontFamily,
		backgroundColor: '#86EFAC',
		borderRadius: '12px',
		color: '#000',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Pick your team for gameweek 2!" />
	<Section style={main}>
		<Container style={container}>
			<Text style={header}>The deadline for gameweek 2 ends tomorrow</Text>
			<Text style={paragraph}>Thanks for joining Gameweek Gurus for the 2023/24 season!</Text>
      <Text>This is a reminder to let you know that the deadline for gameweek 2 is fast approaching – changes will be locked at 19:45 BST on Friday, when Nottingham Forest take on Sheffield United in the first game of gameweek 2, so make sure you make your selection before then!</Text>
			<Section style={btnContainer}>
				<Button pX={12} pY={12} style={button} href="https://gameweekgurus.app/gameweek">
					View fixtures
				</Button>
			</Section>
			<Text style={paragraph}>Thanks for playing!</Text>
			<Text style={footer}>To stop receiving emails like this one, visit <Link href="https://www.gameweekgurus.app/profile">your profile</Link>, uncheck the emails checkbox, and Save Preferences.</Text>
			<Hr style={hr} />
			<Text style={footer}>Cameron</Text>
		</Container>
	</Section>
</Html>
