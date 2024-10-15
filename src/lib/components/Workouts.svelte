<script lang="ts">
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'
	import WorkoutCard from './WorkoutCard.svelte'

	type Props = {
		workouts: Workout[]
	}

	let { workouts = $bindable() }: Props = $props()
</script>

<div class="m-3">
	<div class="flex flex-wrap justify-center">
		{#each workouts as { title, description, exercises, pr, minutes, seconds }}
			<WorkoutCard {title} {description} {exercises} {pr} {minutes} {seconds} />
		{/each}
	</div>
</div>
