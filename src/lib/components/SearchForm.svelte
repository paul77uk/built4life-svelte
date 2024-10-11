<script>
	import { page } from '$app/stores'
	import Input from './ui/input/input.svelte'
	import Search from 'lucide-svelte/icons/search'

	let initialQuery = $page.url.searchParams.get('query') || ''
</script>

<search>
	<form class="relative mx-auto mt-2 flex w-fit" data-sveltekit-keepfocus>
		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
		<Input
			class="pl-8"
			oninput={(event) => {
				event.currentTarget.form?.requestSubmit()
			}}
			value={initialQuery}
			type="search"
			name="query"
			placeholder="Search workouts..."
		/>
	</form>
</search>
