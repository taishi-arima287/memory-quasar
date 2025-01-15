import { Module } from "@nestjs/common";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import { DocumentRepository } from "./document.repository";
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  controllers: [DocumentController],
  providers: [PrismaService, DocumentService, DocumentRepository],
  exports: [DocumentService],
})
export class DocumentModule {}
