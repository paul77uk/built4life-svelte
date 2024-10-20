<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js'
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'
	import { superForm } from 'sveltekit-superforms'
	import * as Form from '$lib/components/ui/form'
	import { Button } from '$lib/components/ui/button/index.js'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { formSchema } from '../../routes/(app)/schema'
	import { Input } from '$lib/components/ui/input/index.js'
	import { Loader } from 'lucide-svelte'

	type Props = {
		workout: Workout
		form: any
	}

	let { form, workout }: Props = $props()
	console.log(form)

	let { title, description, exercises, pr, minutes, seconds } = workout

	const formData = superForm(form, {
		validators: zodClient(formSchema),
		onUpdated: (data) => {
			console.log(data)
		},
	})

	const { form: formSuper, enhance, delayed, errors } = formData
</script>

<Card.Root class="m-3 flex w-[300px] flex-col px-5">
	<Card.Header>
		<Card.Title class="mx-auto text-center">{title}</Card.Title>
		<Card.Description class="mx-auto text-center"
			>{description}</Card.Description
		>
	</Card.Header>
	<Card.Content class="mx-auto">
		{#if exercises}
			{#each exercises as exercise}
				<p>{exercise}</p>
			{/each}
		{/if}
	</Card.Content>
	<!-- could use flex-1 or grow -->
	<Card.Footer class="grow">
		<form method="POST" class="w-full" use:enhance >
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Input type="hidden" {...attrs} bind:value={$formSuper.title} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formSuper.description} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			{#if exercises}
				{#each exercises as exercise, i}
					<Form.Field {form} name="exercises">
						<Form.Control let:attrs>
							<Input
								type="hidden"
								{...attrs}
								bind:value={$formSuper.exercises[i]}
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/each}
			{/if}

			<!-- <input type="hidden" name={'description'} value={description} />
			{#if exercises}
				{#each exercises as exercise, i}
					<input type="hidden" name={'exercises'} value={exercises[i]} />
				{/each}
			{/if}
			<input type="hidden" name={'pr'} value={pr} />
			<input type="hidden" name={'minutes'} value={minutes} />
			<input type="hidden" name={'seconds'} value={seconds} /> -->

			<Form.Field {form} name="pr">
				<Form.Control let:attrs>
					<Input type="hidden" {...attrs} bind:value={$formSuper.pr} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="minutes">
				<Form.Control let:attrs>
					<Input type="hidden" {...attrs} bind:value={$formSuper.minutes} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="seconds">
				<Form.Control let:attrs>
					<Input type="hidden" {...attrs} bind:value={$formSuper.seconds} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button type={'submit'} class="w-full"
				>{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					Add to my workouts
				{/if}</Button
			>
		</form>
	</Card.Footer>
</Card.Root>
