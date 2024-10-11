// import { workoutTable } from '$lib/schema/index.js'
// import { db } from '$lib/server/db/db'
import { workoutsRepo } from '$lib/server/repos/workouts/WorkoutsInMemoryRepo'
// import type { Workout } from '$lib/types/index.js'

export const load = async ({ url }) => {
	const query = url.searchParams.get('query') || ''
	const workouts = await workoutsRepo.search(query)
	

	// const createWorkout = async ({ title, description, exercises }: Workout) => {
	// 	const workoutData = await db.insert(workoutTable).values({
	// 		title,
	// 		description,
	// 		exercises,
	// 	})
	// 	return workoutData
	// }

	return { workouts }
}
