<script lang="ts">
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to <mark>GameweekGurus</mark> 👋</h1>

<h2>the <mark>live</mark> football predictor game</h2>

<ol>
	<li>Make your predictions for the upcoming gameweek</li>
	<li>Score points for correct predictions</li>
	<li>Climb the leaderboard and win!</li>
</ol>

<section>
	<h2>
		Join {data?.users} other players by <a href="/login">creating your account today!</a>
	</h2>
</section>

<style>
	h2 mark {
		background-color: #eb1717;
		color: var(--color-text-light);
		text-decoration: underline;
		padding-inline: 4px;
	}

	mark {
		background-color: #000;
		color: var(--color-text-light);
		padding-inline: 2px;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		margin-bottom: 1rem;
		font-size: 1rem;
		font-weight: 700;
	}

	li::before {
		content: '⚽️';
		margin-right: 0.5rem;
	}
</style>
