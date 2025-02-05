import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  createDocumentTableSchema,
  DocumentSchema,
  documentTable,
  updateCombinedSchema,
  UpdateDocumentSchema,
} from "@/db/schema/document";
import { getAuthUser } from "@/lib/kinde";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/db";
import { and, desc, eq, ne } from "drizzle-orm";
import { error } from "console";
import {
  educationTable,
  experienceTable,
  personalInfoTable,
  skillsTable,
} from "@/db/schema";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentTableSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid("json") as DocumentSchema;
        const userId = user.id;
        const authorName = `${user.given_name} ${user?.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title,
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail,
        };

        const [data] = await db
          .insert(documentTable)
          .values(newDoc)
          .returning();
        return c.json(
          {
            success: "ok",
            data,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to create document",
            error: error,
          },
          500
        );
      }
    }
  )
  .patch(
    "/update/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    zValidator("json", updateCombinedSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const userId = user.id;
        const { documentId } = c.req.valid("param");

        const {
          title,
          status,
          summary,
          themeColor,
          thumbnail,
          currentPosition,
          personalInfo,
          education,
          experience,
          skills,
        } = c.req.valid("json");

        if (!documentId) {
          return c.json(
            {
              success: false,
              message: "Document ID is required",
            },
            400
          );
        }
        await db.transaction(async (trx) => {
          const [existingDocument] = await trx
            .select()
            .from(documentTable)
            .where(
              and(
                eq(documentTable.userId, userId),
                eq(documentTable.documentId, documentId)
              )
            );

          if (!existingDocument) {
            return c.json(
              {
                success: false,
                message: "Document not found",
              },
              404
            );
          }

          const resumeUpdate = {} as UpdateDocumentSchema;
          if (title) resumeUpdate.title = title;
          if (status) resumeUpdate.status = status;
          if (summary) resumeUpdate.summary = summary;
          if (themeColor) resumeUpdate.themeColor = themeColor;
          if (thumbnail) resumeUpdate.thumbnail = thumbnail;
          if (currentPosition)
            resumeUpdate.currentPosition = currentPosition || 1;

          if (Object.keys(resumeUpdate).length > 0) {
            await trx
              .update(documentTable)
              .set(resumeUpdate)
              .where(
                and(
                  eq(documentTable.userId, userId),
                  eq(documentTable.documentId, documentId)
                )
              )
              .returning();
          }

          if (personalInfo) {
            if (!personalInfo?.firstName && !personalInfo?.lastName) {
              return;
            }
            const exists = await trx
              .select()
              .from(personalInfoTable)
              .where(eq(personalInfoTable.docId, existingDocument.id))
              .limit(1);

            if (exists.length > 0) {
              await trx
                .update(personalInfoTable)
                .set(personalInfo)
                .where(eq(personalInfoTable.docId, existingDocument.id));
            } else {
              await trx.insert(personalInfoTable).values({
                ...personalInfo,
                docId: existingDocument.id,
              });
            }
          }

          if (experience && Array.isArray(experience)) {
            const existingExperience = await trx
              .select()
              .from(experienceTable)
              .where(eq(experienceTable.docId, existingDocument.id));

            const existingExperienceMap = new Set(
              existingExperience.map((exp) => exp.id)
            );
            for (const exp of experience) {
              if (exp.id) {
                if (existingExperienceMap.has(exp.id)) {
                  const { id, ...updateData } = exp;
                  await trx
                    .update(experienceTable)
                    .set(updateData)
                    .where(
                      and(
                        eq(experienceTable.docId, existingDocument.id),
                        eq(experienceTable.id, id)
                      )
                    );
                }
              } else {
                const { id, ...insertData } = exp;
                await trx.insert(experienceTable).values({
                  docId: existingDocument.id,
                  ...insertData,
                });
              }
            }
          }

          if (education && Array.isArray(education)) {
            const existingEducation = await trx
              .select()
              .from(educationTable)
              .where(eq(educationTable.docId, existingDocument.id));

            const existingEducationMap = new Set(
              existingEducation.map((edu) => edu.id)
            );
            for (const edu of education) {
              if (edu.id) {
                if (existingEducationMap.has(edu.id)) {
                  const { id, ...updateData } = edu;
                  await trx
                    .update(educationTable)
                    .set(updateData)
                    .where(
                      and(
                        eq(educationTable.docId, existingDocument.id),
                        eq(educationTable.id, id)
                      )
                    );
                }
              } else {
                const { id, ...insertData } = edu;
                await trx.insert(educationTable).values({
                  docId: existingDocument.id,
                  ...insertData,
                });
              }
            }
          }

          if (skills && Array.isArray(skills)) {
            const existingSkills = await trx
              .select()
              .from(skillsTable)
              .where(eq(skillsTable.docId, existingDocument.id));

            const existingSkillsMap = new Set(
              existingSkills.map((skill) => skill.id)
            );
            for (const skill of skills) {
              if (skill.id) {
                if (existingSkillsMap.has(skill.id)) {
                  const { id, ...updateData } = skill;
                  await trx
                    .update(skillsTable)
                    .set(updateData)
                    .where(
                      and(
                        eq(skillsTable.docId, existingDocument.id),
                        eq(skillsTable.id, id)
                      )
                    );
                }
              } else {
                const { id, ...insertData } = skill;
                await trx.insert(skillsTable).values({
                  docId: existingDocument.id,
                  ...insertData,
                });
              }
            }
          }
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to update document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db
        .select()
        .from(documentTable)
        .orderBy(desc(documentTable.updatedAt))
        .where(
          and(
            eq(documentTable.userId, userId),
            ne(documentTable.status, "archived")
          )
        );
      return c.json(
        {
          success: true,
          data: documents,
        },
        { status: 200 }
      );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to fetch documents",
          error: error,
        },
        500
      );
    }
  })
  .get(
    "/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const userId = user?.id;
        const { documentId } = c.req.valid("param");
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          },
        });
        return c.json(
          {
            success: true,
            data: documentData,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to fetch document data",
            error: error,
          },
          500
        );
      }
    }
  );

export default documentRoute;
