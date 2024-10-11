<script>
	import { CircleUserRound } from 'lucide-svelte'
	import { isAuthenticated } from '../../routes/isAuthenticated.svelte'

  let isLoggedIn = isAuthenticated()
</script>

<ul class="text-white">
	<li>
		<a href="/api/auth/login">Sign in</a>
	</li>
	<li>
		<a href="/api/auth/register">Sign up</a>
	</li>
	<li>
		<a href="/api/auth/logout"> Sign out </a>
	</li>
	<li>{isLoggedIn.authState}</li>
</ul>

<CircleUserRound color={'white'} size={30} />
