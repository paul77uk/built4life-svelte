<script>
	import { CircleUserRound } from 'lucide-svelte'
	import { isAuthenticated } from '../../routes/isAuthenticated.svelte'
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
	} from '$lib/components/ui/dropdown-menu'
	import { LogOut, LogIn } from 'lucide-svelte'
	import Button from './ui/button/button.svelte'

	let isLoggedIn = isAuthenticated()
</script>

{#if isLoggedIn.authState}
	<DropdownMenu>
		<DropdownMenuTrigger>
			<CircleUserRound color={'white'} size={30} />
		</DropdownMenuTrigger>
		<DropdownMenuContent class="me-5 min-w-[4rem]">
			<DropdownMenuItem>
				<a
					class="flex items-center justify-center gap-2 font-medium"
					href="/api/auth/logout"
				>
					<LogOut size={16} />
					Logout
				</a>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
{:else}
	<a href="/api/auth/login">
		<Button class="flex gap-2 bg-[#DF0000] hover:bg-[#DF2222]">
			<LogIn size={16} />
			Login
		</Button>
	</a>
{/if}
