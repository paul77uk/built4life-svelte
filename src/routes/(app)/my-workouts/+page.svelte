<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog'

	let openModal = $state(true)
</script>

<Dialog.Root bind:open={openModal}>
	<!-- <Dialog.Trigger>Open</Dialog.Trigger> -->
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create new workout</Dialog.Title>
			<form action="/?/createWorkout" enctype="multipart/form-data">
        <div>

        </div>
      </form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<!-- TODO: maybe delete above, as don't think I need -->
<!-- TODO: Dropdown maybe add, just before hour mark on vid tut -->
