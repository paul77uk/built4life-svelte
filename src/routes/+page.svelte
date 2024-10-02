<script lang="ts">
	import Workouts from '$lib/components/Workouts.svelte'

	let { data } = $props()
	// let workouts: Workout[] = data.workouts
</script>

<Workouts workouts={data.workouts} />
