<script>
	import '@fontsource/rubik-dirt'
	import UserButton from './UserButton.svelte'
</script>

<nav class=" bg-black">
	<div
		class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
	>
		<div class="flex gap-3">
			<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<span
					class={'nav-logo gap-2 self-center whitespace-nowrap text-2xl text-white sm:ms-0 sm:text-3xl lg:text-4xl'}
				>
					BUILT<span class="text-[#DF0000]">4</span>LIFE
				</span>
			</a>
		</div>

		<UserButton />
	</div>
</nav>
