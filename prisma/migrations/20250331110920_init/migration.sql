-- CreateTable
CREATE TABLE "Blog" (
    "Id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "draft" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "Id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
