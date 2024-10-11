<script lang="ts">
	import '../app.css'
	let { children } = $props()
</script>
<a href="/api/auth/login">Sign in</a>
<a href="/api/auth/register">Sign up</a>
{@render children()}
