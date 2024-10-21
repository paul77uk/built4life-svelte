<script lang="ts">
	import { workoutsState } from '$lib/state.svelte'

	import Input from './ui/input/input.svelte'
	import Search from 'lucide-svelte/icons/search'

	// let initialQuery = $page.url.searchParams.get('query') || ''
type Workout = {
  id?: string,
	title: string
	description?: string
	exercises?: string[]
	pr?: number
	minutes?: number
	seconds?: number
}

	type Props = {
		workouts: Workout[]
	}

	let query = $state('')
	let { workouts }: Props = $props()
</script>

<search>
	<form class="relative mx-auto mt-6 flex w-fit" data-sveltekit-keepfocus>
		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input
			class="pl-8"
			bind:value={query}
			oninput={() => {
				workoutsState.filteredWorkouts = workouts.filter((workout) =>
					workout.title.toLowerCase().includes(query.toLowerCase()),
				)
			}}
			type="search"
			placeholder="Search workouts..."
		/>
	</form>
</search>
