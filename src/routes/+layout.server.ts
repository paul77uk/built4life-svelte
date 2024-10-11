import { userTable } from '$lib/schema'
import { db } from '$lib/server/db'
import {
	kindeAuthClient,
	type SessionManager,
} from '@kinde-oss/kinde-auth-sveltekit'
import type { RequestEvent } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

export const load = async ({ request }: RequestEvent) => {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager,
	) // Boolean: true or false
	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(
			request as unknown as SessionManager,
		)

		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.id, user.id))
			.limit(1)

		// sign up
		if (existingUser.length === 0) {
			await db.insert(userTable).values({
				id: user.id,
				email: user.email!,
				firstName: user.given_name,
				lastName: user.family_name,
			})
		}

		// redirect user to home page
		return { isAuthenticated }
	} else {
		// Need to implement, e.g: redirect user to sign in, etc..
	}
}
