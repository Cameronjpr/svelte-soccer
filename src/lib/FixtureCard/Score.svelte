<script lang="ts">
	import type { Fixture } from '@lib/types';

	export let fixture: Fixture;

	const { team_h_score, team_a_score, started, kickoff_time } = fixture;
</script>

<section class="p-1 text-sm">
	{#if team_h_score != null && team_a_score != null}
		<span class="font-semibold">
			{team_h_score} : {team_a_score}
		</span>
	{:else}
		<span id="kickoff-time" class="text-sm"
			>{new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
				new Date(kickoff_time)
			)}</span
		>
	{/if}
</section>
