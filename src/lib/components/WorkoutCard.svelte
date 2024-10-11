<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import type { Workout } from '$lib/server/repos/workouts/WorkoutsRepoInterface'

	import Button from './ui/button/button.svelte'

	let { title, description, exercises = $bindable() }: Workout = $props()
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
		<Button class="w-full">Add to My Workouts</Button>
	</Card.Footer>
</Card.Root>
