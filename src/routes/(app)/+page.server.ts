import { workoutTable } from '$lib/schema'
import { db } from '$lib/server/db'
import { workoutsRepo } from '$lib/server/repos/workouts/WorkoutsInMemoryRepo'
import type { WorkoutInsert } from '$lib/types/index.js'
import {
	kindeAuthClient,
	type SessionManager,
} from '@kinde-oss/kinde-auth-sveltekit'
import { redirect } from '@sveltejs/kit'
import { eq, and } from 'drizzle-orm'
import { fail, setError, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { formSchema } from './schema'

// import type { Workout } from '$lib/types/index.js'

export const load = async ({ url }) => {
	const query = url.searchParams.get('query') || ''
	const workouts = await workoutsRepo.search(query)
	const form = await superValidate(zod(formSchema))
	return { workouts, form }
}

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formSchema))

		if (!form.valid) {
			return fail(400, { form })
		}

		const { title, description, exercises, pr, minutes, seconds } = form.data

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

			// check if workout with same title already exists
			const existingWorkout = await db
				.select()
				.from(workoutTable)
				.where(
					and(
						eq(workoutTable.title, (title as string) || ''),
						eq(workoutTable.userId, user.id),
					),
				)
				.limit(1)

			if (existingWorkout.length > 0) {
				return setError(form, 'title', 'Workout with this title already exists')
			}

			try {
				await db.insert(workoutTable).values({
					title,
					description,
					exercises,
					pr,
					minutes,
					seconds,
					userId: user.id,
				} as WorkoutInsert)
			} catch (error) {
				console.log(`${error} Failed to create workout`)
			}

			redirect(302, '/my-workouts')
		}
	},
}
