import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { redirect } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { generateIdFromEntropySize } from 'lucia'

import { Scrypt } from 'lucia'
import { db } from '$lib/server/db'
import { userTable } from '$lib/schema'
import { registerSchema } from '$lib/validator'
import { lucia } from '$lib/server/auth'

export const load = async () => {
	const form = await superValidate(zod(registerSchema))
	return { form }
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema))
		if (!form.valid) {
			return fail(400, { form })
		}
		const { email, firstName, lastName, password } = form.data
		const scrypt = new Scrypt()
		const passwordHash = await scrypt.hash(password)

		const userId = generateIdFromEntropySize(10)

		const user = await db
			.select({ email: userTable.email })
			.from(userTable)
			.where(eq(userTable.email, email))
			.limit(1)
		if (user.length > 0) {
			return setError(form, 'email', 'this email is already taken')
		}

		try {
			await db.insert(userTable).values({
				id: userId,
				email,
				firstName,
				lastName,
				passwordHash,
			})

			const session = await lucia.createSession(userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes,
			})
		} catch (error) {
			console.log('🚀 ~ default: ~ error:', error)
		}
		redirect(302, '/')
	},
}
