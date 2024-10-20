<script lang="ts">
	import SearchForm from '$lib/components/SearchForm.svelte'
	import Workouts from '$lib/components/Workouts.svelte'
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface.js'
	import * as Card from '$lib/components/ui/card/index.js'

	import { superForm } from 'sveltekit-superforms'
	import * as Form from '$lib/components/ui/form'
	import { Button } from '$lib/components/ui/button/index.js'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { formSchema } from '../../routes/(app)/schema'
	import { Input } from '$lib/components/ui/input/index.js'
	import { Loader } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'
	import WorkoutForm from '$lib/components/WorkoutForm.svelte'

	let { data } = $props()
	let workouts: Workout[] = data.workouts

	// const form = superForm(data.form, {
	// 	validators: zodClient(formSchema),
	// 	dataType: 'json',

	// 	// onUpdated: (form) => {
	// 	// 	toast.success(`Workout added to your workouts`)
	// 	// },
	// })

	// const { form: formData, enhance, delayed, errors } = form
</script>

<SearchForm />
<!-- <Workouts {...data} /> -->

<div class="m-3">
	<div class="flex flex-wrap justify-center">
		{#each workouts as workout}
			<Card.Root class="m-3 flex w-[300px] flex-col px-5">
				<Card.Header>
					<Card.Title class="mx-auto text-center">{workout.title}</Card.Title>
					<Card.Description class="mx-auto text-center"
						>{workout.description}</Card.Description
					>
				</Card.Header>
				<Card.Content class="mx-auto">
					{#if workout.exercises}
						{#each workout.exercises as exercise}
							<p>{exercise}</p>
						{/each}
					{/if}
				</Card.Content>
				<!-- could use flex-1 or grow -->
				<Card.Footer class="grow">
					<WorkoutForm {workout} {data} />
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
