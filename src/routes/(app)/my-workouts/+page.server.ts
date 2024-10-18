import { workoutTable } from '$lib/schema'
import { db } from '$lib/server/db'

import {
	kindeAuthClient,
	type SessionManager,
} from '@kinde-oss/kinde-auth-sveltekit'

import { and, asc, eq, lt } from 'drizzle-orm'


export const load = async ({ url, request }) => {
	const query = url.searchParams.get('query') || ''

	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager,
	) // Boolean: true or false

	if (isAuthenticated) {
		const user = await kindeAuthClient.getUser(
			request as unknown as SessionManager,
		)
		const workouts = await db.query.workoutTable.findMany({
			where: eq(workoutTable.userId, user.id),
			orderBy: [asc(workoutTable.createdAt)],
		})

		const filteredWorkouts = query
			? workouts.filter(({ title }) =>
					title.toLowerCase().includes(query.toLowerCase()),
				)
			: workouts
		return { filteredWorkouts }
	}
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		try {
			await db
				.update(workoutTable)
				.set({
					pr: parseInt(data.get('prAttempt') as string) || 0,
				})
				.where(
					and(
						eq(workoutTable.id, data.get('id') as string),
						lt(workoutTable.pr, parseInt(data.get('prAttempt') as string) || 0),
					),
				)
		} catch (error) {
			return { error: `${error }Failed to update PR` }
		}
	},
}
