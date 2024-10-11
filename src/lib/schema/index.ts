import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash'),
	firstName: varchar('first_name', { length: 50 }).notNull(),
	lastName: text('last_name').notNull(),
})

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

export const workoutTable = pgTable('workout', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	title: text('title').notNull(),
	description: text('description'),
	exercises: text('exercises').notNull().array(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
})

// npm run push
// npm run studio
