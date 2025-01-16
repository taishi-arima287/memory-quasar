/*
  Warnings:

  - Added the required column `user_name` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "user_name" VARCHAR(100) NOT NULL;
