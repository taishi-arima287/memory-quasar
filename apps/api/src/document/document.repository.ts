import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { GetDocumentListRequest } from "./dto/get-documentList.dto";
import { GetDocumentRequest } from "./dto/get-document.dto";
import { Document } from "@prisma/client";
import { PostDocumentRequest } from "./dto/post-document.dto";
import { DeleteDocumentRequest } from "./dto/delete-document.dto";
import { PutDocumentRequest } from "./dto/put-document.dto";

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
      const docs = await this.prisma.document.findMany({
        where: {
          OR: [
            { visibility: "PUBLIC" },
            { AND: [{ spaceId: getDocumentListRequest.spaceId }, { visibility: "SPACE" }] },
            {
              AND: [{ userId: getDocumentListRequest.userId }, { visibility: "PRIVATE" }],
            },
          ],
        },
        orderBy: { id: "asc" },
      });
      return docs;
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
          thumbnail: postDocumentRequest.thumbnail,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの作成に失敗しました");
    }
  }

  async putDocument(putDocumentRequest: PutDocumentRequest & { id: string }): Promise<void> {
    try {
      await this.prisma.document.update({
        where: { id: putDocumentRequest.id },
        data: {
          title: putDocumentRequest?.title,
          content: putDocumentRequest?.content,
          visibility: putDocumentRequest?.visibility,
          thumbnail: putDocumentRequest?.thumbnail,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの更新に失敗しました");
    }
  }

  async deleteDocument(deleteDocumentRequest: DeleteDocumentRequest): Promise<void> {
    try {
      await this.prisma.document.delete({ where: { id: deleteDocumentRequest.id } });
    } catch (error) {
      throw new InternalServerErrorException("ドキュメントの削除に失敗しました");
    }
  }
}
