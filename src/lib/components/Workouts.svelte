<script lang="ts">
	import type { Workout } from '$lib/repos/workouts/WorkoutsRepoInterface.js'
	import WorkoutCard from './WorkoutCard.svelte'

	type Props = {
		workouts: Workout[]
	}

	let { workouts = $bindable() }: Props = $props()
</script>

<div class="m-3">
  <div class="flex flex-wrap justify-center">
    {#each workouts as { title, description, exercises }}
      <WorkoutCard {title} {description} {exercises} />
    {/each}
  </div>
</div>
