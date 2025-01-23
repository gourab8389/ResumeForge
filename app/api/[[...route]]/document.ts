import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createDocumentTableSchema, DocumentSchema } from "@/db/schema/document";
import { getAuthUser } from "@/lib/kinde";


const documentRoute = new Hono()
    .post("/create",
        zValidator("json", createDocumentTableSchema),
        getAuthUser,
        async (c) => {
            try {
               const user = c.get("user");
               const { title,  } = c.req.valid("json") as DocumentSchema;
               const userId = user.id;
               const authorName = `${user.given_name} ${user?.family_name}`;
               const authorEmail = user.email as string;
            } catch (error) {
                
            }
        }
    );

export default documentRoute;