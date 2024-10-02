<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/components/ui/button/button.svelte'
</script>

<!-- TODO: Center height responsively, maybe style better and split error pages into own components -->
<main
	class="container flex h-[calc(100vh-64px)] w-fit flex-col justify-center gap-1"
>
	{#if $page.status === 404}
		<div class="text-3xl font-bold">Page not found!</div>
		<p>page <strong>{$page.url.pathname}</strong> does not exist</p>
		<Button href="/">Back to homepage</Button>
	{:else}
		<h1 class="text-3xl font-bold">Something went wrong</h1>
		<p>We had a problem rendering this page.</p>
		<Button
			onclick={() => {
				location.reload()
			}}>Try refreshing?</Button
		>
		<p>{$page.status} {$page.error?.message}</p>
	{/if}
</main>
