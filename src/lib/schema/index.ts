import { integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

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
	id: uuid('id').primaryKey().notNull().defaultRandom(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	title: text('title').notNull(),
	description: text('description'),
	exercises: text('exercises').notNull().array(),
	pr: integer('pr'),
	minutes: integer('minutes'),
	seconds: integer('seconds'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull().defaultNow(),
})

// npm run push
// npm run studio
