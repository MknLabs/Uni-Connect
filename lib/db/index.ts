import { env } from "../config";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "./schemas/index"

const db = drizzle(env.POSTGRES_URL, { schema });
export default db;