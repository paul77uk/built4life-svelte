<script lang="ts">
	import SearchForm from '$lib/components/SearchForm.svelte'
	import Workouts from '$lib/components/Workouts.svelte'

	let { data } = $props()
	// let workouts: Workout[] = data.workouts
</script>

<SearchForm />
<Workouts {...data} />
