<script lang="ts">
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'

	import WorkoutCard from './WorkoutCard.svelte'

	type Props = {
		workouts: Workout[]
		form: any
	}

	let { workouts, form }: Props = $props()
</script>

<div class="m-3">
	<div class="flex flex-wrap justify-center">
		{#each workouts as workout}
			<WorkoutCard {workout} {form} />
		{/each}
	</div>
</div>
