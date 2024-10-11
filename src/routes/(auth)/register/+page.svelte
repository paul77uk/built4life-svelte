<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Card from '$lib/components/ui/card/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { registerSchema } from '$lib/validator/index.js'
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import * as Form from '$lib/components/ui/form'
		import { Loader } from 'lucide-svelte';
	// data is the data from the corresponding +page.server.ts file
	// data is passed to the component as a prop
	// we can then get the form data from the data object, which was in the +page.server.ts file
	let { data } = $props()
	const form = superForm(data.form, {
		validators: zodClient(registerSchema),
	})

	// enhance is a function that takes a form object and returns an enhanced form object
	// enhanced form object has additional properties and methods
	const { form: formData, enhance, delayed, errors } = form
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign Up</Card.Title>
		<Card.Description
			>Enter your information to create an account</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance class="grid gap-4">
			<div class="grid grid-cols-2 gap-4">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input
							{...attrs}
							placeholder="first name"
							bind:value={$formData.firstName}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input
							{...attrs}
							placeholder="last name"
							bind:value={$formData.lastName}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} placeholder="email" bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						{...attrs}
						type="password"
						placeholder="password"
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button type="submit" class="w-full">
				{#if $delayed}
					<Loader class="size-4 animate-spin"/>
				{:else}
					Create an account
				{/if}
			</Button>
			<Button variant="outline" class="w-full">Sign up with GitHub</Button>
		</form>

		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
