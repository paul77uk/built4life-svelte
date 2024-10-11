import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'
import { config } from 'dotenv'
config({ path: '.env' })

export default defineConfig({
	schema: './src/lib/schema',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	out: './migrations',
})
