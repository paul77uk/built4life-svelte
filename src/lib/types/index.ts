import { userTable, workoutTable } from '$lib/schema'

export type User = typeof userTable.$inferSelect
export type Workout = typeof workoutTable.$inferSelect
