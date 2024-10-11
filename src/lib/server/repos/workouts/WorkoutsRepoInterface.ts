export type Workout = {
	title: string
	description?: string
	exercises?: string[]
	pr?: number
	minutes?: number
	seconds?: number
}

export interface WorkoutsRepo {
	getAll(): Promise<Workout[]>
	search(query?: string | null): Promise<Workout[]>
}
