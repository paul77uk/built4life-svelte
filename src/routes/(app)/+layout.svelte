<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import SubHeader from '$lib/components/SubHeader.svelte'
	import { isAuthenticated } from '../isAuthenticated.svelte'
	// $props() is a function that returns the props passed to the component
	// in this case, it returns an object with a key children
	// we destructure the children key from the object
	// and assign it to a variable called children
	// this is a shorthand way of writing the following:
	// let props = $props()
	// let children = props.children
	// or
	// let { children } = $props()
	// children is a function that returns the children of the component
	// it is a built-in Svelte function that is used to render the children of a component

	let { children, data } = $props()

	let isLoggedin = isAuthenticated()
	isLoggedin.authState = data.isAuthenticated
</script>

<Header />
<SubHeader />
{@render children()}
