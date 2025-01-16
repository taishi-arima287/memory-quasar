import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { GetDocumentListRequest } from "./dto/get-documentList.dto";
import { GetDocumentRequest } from "./dto/get-document.dto";
import { Document } from "@prisma/client";
import { PostDocumentRequest } from "./dto/post-document.dto";

@Injectable()
export class DocumentRepository {
  constructor(private prisma: PrismaService) {}

  async getDocument(getDocumentRequest: GetDocumentRequest): Promise<Document | null> {
    try {
      return this.prisma.document.findUnique({ where: { id: getDocumentRequest.id } });
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの取得に失敗しました");
    }
  }

  async getDocumentList(getDocumentListRequest: GetDocumentListRequest): Promise<Document[]> {
    try {
      const [publicDocs, spaceDocs, privateDocs] = await Promise.all([
        this.getPublicDocuments(),
        this.getSpaceDocuments(getDocumentListRequest.spaceId),
        this.getPrivateDocuments(getDocumentListRequest.userId),
      ]);

      return [...publicDocs, ...spaceDocs, ...privateDocs].sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの取得に失敗しました");
    }
  }

  async postDocument(postDocumentRequest: PostDocumentRequest): Promise<Document> {
    try {
      return this.prisma.document.create({
        data: {
          title: postDocumentRequest.title,
          content: postDocumentRequest.content,
          visibility: postDocumentRequest.visibility,
          spaceId: postDocumentRequest.spaceId,
          userId: postDocumentRequest.userId,
          userName: postDocumentRequest.userName,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの作成に失敗しました");
    }
  }

  private async getPublicDocuments(): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: { visibility: "PUBLIC" },
    });
  }

  private async getSpaceDocuments(spaceId: string): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: { spaceId },
    });
  }

  private async getPrivateDocuments(userId: string): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: {
        visibility: "PRIVATE",
        userId,
      },
    });
  }
}
