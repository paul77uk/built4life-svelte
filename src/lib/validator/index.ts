import { userTable } from '$lib/schema'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const registerSchema = createInsertSchema(userTable, {
	email: (s) => s.email.email(),
	firstName: (s) => s.firstName.min(1, { message: 'First name is required' }),
	lastName: (s) => s.lastName.min(1, { message: 'Last name is required' }),
})
	.extend({
		password: z.string().min(8),
	})
	.omit({
		id: true,
		passwordHash: true,
	})

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})
