import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  freePlan: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ }) => {
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;