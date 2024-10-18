<script lang="ts">
	import MyWorkout from '$lib/components/MyWorkout.svelte'
	import SearchForm from '$lib/components/SearchForm.svelte'

	let { data } = $props()
</script>

<SearchForm />

{#if !data.filteredWorkouts}
	<p>No Workouts</p>
{:else}
	<div class="m-3 flex flex-wrap justify-center">
		{#each data.filteredWorkouts as workout}
			<MyWorkout {...workout} />
		{/each}
	</div>
{/if}
