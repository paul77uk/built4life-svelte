import { workoutTable } from '$lib/schema'
import { db } from '$lib/server/db'
import { workoutsRepo } from '$lib/server/repos/workouts/WorkoutsInMemoryRepo'
import type { WorkoutInsert } from '$lib/types/index.js'
import {
	kindeAuthClient,
	type SessionManager,
} from '@kinde-oss/kinde-auth-sveltekit'
import { redirect } from '@sveltejs/kit'

// import type { Workout } from '$lib/types/index.js'

export const load = async ({ url }) => {
	const query = url.searchParams.get('query') || ''
	const workouts = await workoutsRepo.search(query)
	return { workouts }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const isAuthenticated = await kindeAuthClient.isAuthenticated(
			request as unknown as SessionManager,
		) // Boolean: true or false

		if (isAuthenticated) {
			const user = await kindeAuthClient.getUser(
				request as unknown as SessionManager,
			)

			// console.log(data.get('title'))
			// console.log(data.get('description'))
			// console.log(data.getAll('exercises'))
			// console.log(data.get('pr'))
			// console.log(data.get('minutes'))
			// console.log(data.get('seconds'))
			// console.log(user.id)

			try {
				await db.insert(workoutTable).values({
					title: data.get('title'),
					description: data.get('description'),
					exercises: data.getAll('exercises'),
					pr: data.get('pr') || 0,
					minutes: data.get('minutes') || 0,
					seconds: data.get('seconds') || 0,
					userId: user.id,
				} as WorkoutInsert)
			} catch (error) {
				return { error }
			}

			redirect(302, '/my-workouts')
		}
	},
}
