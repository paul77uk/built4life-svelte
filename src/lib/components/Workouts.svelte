<script lang="ts">
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'
	import { superForm } from 'sveltekit-superforms'
	import WorkoutCard from './WorkoutCard.svelte'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { formSchema } from '../../routes/(app)/schema'

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
