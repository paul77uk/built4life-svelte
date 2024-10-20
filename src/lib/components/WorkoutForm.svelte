<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { formSchema } from '../../routes/(app)/schema'
	import { Button } from '$lib/components/ui/button/index.js'
	import { Loader } from 'lucide-svelte'
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'
	import { toast } from 'svelte-sonner'

	type Props = {
		workout: Workout
		data: {
			form: any
		}
	}

	let { workout, data }: Props = $props()

	const { form, enhance, delayed } = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onSubmit: () => {
			$form.title = workout.title
			$form.description = workout.description
			$form.exercises = workout.exercises
			$form.pr = workout.pr
			$form.minutes = workout.minutes
			$form.seconds = workout.seconds
		},

		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success(`Workout ${workout.title} added to your workouts`)
			} else {
				toast.error(`${workout.title} already exists in your workouts`)
			}
		},
	})
</script>

<form method="POST" class="w-full" use:enhance>
	<Button type={'submit'} class="w-full"
		>{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			Add to my workouts
		{/if}</Button
	>
</form>
