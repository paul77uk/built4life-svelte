<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import SubHeader from '$lib/components/SubHeader.svelte'
	import '../app.css'

	let { children } = $props()
</script>

<!-- <svelte:head>
	
</svelte:head> -->

<Header />
<SubHeader />
{@render children()}
