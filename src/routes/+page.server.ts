import { workoutsRepo } from '$lib/repos/workouts/WorkoutsInMemoryRepo'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const workouts = await workoutsRepo.getAll()

	return { workouts }
}
