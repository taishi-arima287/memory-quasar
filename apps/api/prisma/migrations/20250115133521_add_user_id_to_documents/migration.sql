-- CreateEnum
CREATE TYPE "DocumentVisibility" AS ENUM ('PRIVATE', 'PUBLIC', 'SPACE');

-- CreateTable
CREATE TABLE "users" (
    "id" CHAR(36) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "space_id" CHAR(36),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaces" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "owner_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" CHAR(36) NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "space_id" CHAR(36),
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "visibility" "DocumentVisibility" NOT NULL DEFAULT 'PRIVATE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "documents_title_key" ON "documents"("title");

-- CreateIndex
CREATE INDEX "documents_space_id_visibility_idx" ON "documents"("space_id", "visibility");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
