import z from "zod";
import db from "@/lib/db";
import { sql } from 'drizzle-orm';

export const queryDatabase = {
    description: 'Execute SQL query to get data from database',
    inputSchema: z.object({
        query: z.string().describe('SQL query to execute')
    }),
    execute: async ({ query }: { query: string }) => {
        try {
            const result = await db.execute(sql.raw(query));
            console.log(result.rows) //TODO: remove it
            return {
                success: true,
                data: result.rows || [],
                rowCount: result.rows?.length || 0
            };
        } catch (error: unknown) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            };
        }
    },
};