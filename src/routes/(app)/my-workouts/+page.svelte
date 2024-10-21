<script lang="ts">
	import MyWorkout from '$lib/components/MyWorkout.svelte'
	import SearchForm from '$lib/components/SearchForm.svelte'
	import { workoutsState } from '$lib/state.svelte.js'

	type Workout = {
		id?: string
		title: string
		description?: string
		exercises?: string[]
		pr?: number
		minutes?: number
		seconds?: number
	}

	let { data } = $props()

	let workouts = data.workouts as Workout[]
	workoutsState.filteredWorkouts = data.workouts as Workout[]
</script>

<SearchForm {workouts} />

{#if workoutsState.filteredWorkouts.length < 1}
	<p>No Workouts</p>
{:else}
	<div class="m-3 flex flex-wrap justify-center">
		{#each workoutsState.filteredWorkouts as workout}
			<MyWorkout {...workout} />
		{/each}
	</div>
{/if}
