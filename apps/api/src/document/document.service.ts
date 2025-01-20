import { Injectable, NotFoundException } from "@nestjs/common";
import { GetDocumentListRequest, GetDocumentListResponse } from "./dto/get-documentList.dto";
import { GetDocumentRequest, GetDocumentResponse } from "./dto/get-document.dto";
import { PostDocumentRequest, PostDocumentResponse } from "./dto/post-document.dto";
import { DocumentRepository } from "./document.repository";
import { PutDocumentRequest, PutDocumentResponse } from "./dto/put-document.dto";
import { DeleteDocumentRequest, DeleteDocumentResponse } from "./dto/delete-document.dto";

@Injectable()
export class DocumentService {
  constructor(private documentRepository: DocumentRepository) {}

  async getDocument(getDocumentRequest: GetDocumentRequest): Promise<GetDocumentResponse> {
    const document = await this.documentRepository.getDocument(getDocumentRequest);

    if (!document) {
      throw new NotFoundException("ドキュメントが存在しません");
    }

    return { document };
  }

  async getDocumentList(
    getDocumentListRequest: GetDocumentListRequest,
  ): Promise<GetDocumentListResponse> {
    const documents = await this.documentRepository.getDocumentList(getDocumentListRequest);
    return { documents };
  }

  async postDocument(postDocumentRequest: PostDocumentRequest): Promise<PostDocumentResponse> {
    const document = await this.documentRepository.postDocument(postDocumentRequest);
    return { id: document.id };
  }

  async putDocument(
    putDocumentRequest: PutDocumentRequest & { id: string },
  ): Promise<PutDocumentResponse> {
    await this.documentRepository.putDocument(putDocumentRequest);
    return { id: putDocumentRequest.id };
  }

  async deleteDocument(
    deleteDocumentRequest: DeleteDocumentRequest,
  ): Promise<DeleteDocumentResponse> {
    await this.documentRepository.deleteDocument(deleteDocumentRequest);
    return { id: deleteDocumentRequest.id };
  }
}
