<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import { MinusCircle, PlusCircle } from 'lucide-svelte'
	import { Button } from './ui/button'
	import { Input } from './ui/input'

	interface Props {
		id: string
		title: string
		description: string | null
		exercises: string[] | null
		pr: number | null
		minutes: number | null
		seconds: number | null
	}

	let { id, title, description, exercises, pr, minutes, seconds }: Props =
		$props()

	let prAttempt = $state(0)
</script>

<Card.Root class="m-3 flex w-[300px] flex-col px-5">
	<Card.Header>
		<Card.Title class="mx-auto text-center">{title}</Card.Title>
		<Card.Description class="mx-auto text-center"
			>{description}</Card.Description
		>
	</Card.Header>
	<Card.Content class="mx-auto flex h-full flex-col">
		{#if exercises}
			{#each exercises as exercise}
				<p>{exercise}</p>
			{/each}
		{/if}
		{#if pr !== null}
			<div class="flex flex-1 flex-col justify-center">
				<div
					class="m-3 mx-auto w-fit rounded border border-dashed px-3 py-1 text-center text-gray-500"
				>
					PR: {pr}
				</div>
				<div class="flex justify-center">
					<Button
						onclick={() => {
							if (prAttempt > 0) prAttempt -= 1
						}}><MinusCircle /></Button
					>
					<form>
						<Input
							class="w-12 text-center"
							bind:value={prAttempt}
							type={'number'}
              min={0}
						/>
					</form>

					<Button
						onclick={() => {
							prAttempt += 1
							console.log(typeof prAttempt)
						}}><PlusCircle /></Button
					>
				</div>
			</div>
		{/if}
	</Card.Content>
	<!-- could use flex-1 or grow -->
	<Card.Footer class="grow">
		<form method="POST" class="w-full">
			<Input
				type="hidden"
				class="w-12 text-center"
				name={'prAttempt'}
				bind:value={prAttempt}
			/>

			<input type="hidden" name={'id'} value={id} />
			<Button type={'submit'} class="w-full">Save Result</Button>
		</form>
	</Card.Footer>
</Card.Root>
