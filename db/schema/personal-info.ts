import { pgTable, serial } from "drizzle-orm/pg-core";

export const personalInfoTable = pgTable("personal_info", {
    id: serial("id").notNull().primaryKey(),
})