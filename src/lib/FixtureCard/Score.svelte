<script lang="ts">
	import type { Fixture } from '@lib/types';

	export let fixture: Fixture;

	const { team_h_score, team_a_score, started, kickoff_time, finished_provisional } = fixture;
</script>

<section class="p-1 text-sm">
	{#if started}
		{#if team_h_score != null && team_a_score != null}
			<span class={fixture?.finished_provisional ? '' : 'font-bold text-base text-red-500'}
				>{team_h_score} : {team_a_score}
			</span>
		{:else}
			<span id="score" class="text-sm">Delayed</span>
		{/if}
	{:else}
		<span id="kickoff-time" class="text-sm"
			>{new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
				new Date(kickoff_time)
			)}</span
		>
	{/if}
</section>
