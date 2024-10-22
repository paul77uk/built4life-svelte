<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import MyWorkout from '$lib/components/MyWorkout.svelte'
	import SearchForm from '$lib/components/SearchForm.svelte'
	import { workoutsState } from '$lib/state.svelte.js'
	import { toast } from 'svelte-sonner'

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

	if ($page.url.searchParams.get('redirected') === '1') {
		toast.success('New workout added successfully')
		$page.url.searchParams.delete('redirected')
		history.replaceState({}, '', $page.url.toString())
	}
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
