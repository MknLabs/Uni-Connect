import { env } from "./lib/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./lib/db/schemas",
    out: "./lib/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: env.POSTGRES_URL,
    },
})