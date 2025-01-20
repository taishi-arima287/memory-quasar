import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
  ApiBody,
} from "@nestjs/swagger";
import { DocumentService } from "./document.service";
import { GetDocumentRequest, GetDocumentResponse } from "./dto/get-document.dto";
import { GetDocumentListRequest, GetDocumentListResponse } from "./dto/get-documentList.dto";
import { PostDocumentRequest, PostDocumentResponse } from "./dto/post-document.dto";
import { PutDocumentRequest, PutDocumentResponse } from "./dto/put-document.dto";
import { DeleteDocumentRequest, DeleteDocumentResponse } from "./dto/delete-document.dto";
import { AuthGuard } from "@/auth/guards/auth.guard";

@ApiTags("document")
@ApiExtraModels(
  GetDocumentRequest,
  GetDocumentListRequest,
  PostDocumentRequest,
  PutDocumentRequest,
  DeleteDocumentRequest,
)
@Controller("document")
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(":id")
  @ApiOperation({ summary: "ドキュメント情報取得" })
  @ApiParam({
    name: "id",
    type: String,
    description: "ドキュメントID",
    example: "ckv9ydh6s0000gkpj1wybug0x",
  })
  @ApiResponse({
    status: 200,
    description: "ドキュメント情報の取得に成功",
    type: GetDocumentResponse,
  })
  @ApiResponse({ status: 404, description: "ドキュメントが存在しない" })
  async getDocument(@Param() getDocumentRequest: GetDocumentRequest): Promise<GetDocumentResponse> {
    return this.documentService.getDocument(getDocumentRequest);
  }

  @Get()
  @ApiOperation({ summary: "ドキュメント一覧取得" })
  @ApiResponse({
    status: 200,
    description: "ドキュメント一覧の取得に成功",
    type: GetDocumentListResponse,
  })
  async getDocumentList(
    @Query() getDocumentListRequest: GetDocumentListRequest,
  ): Promise<GetDocumentListResponse> {
    return this.documentService.getDocumentList(getDocumentListRequest);
  }

  @Post()
  @ApiOperation({ summary: "ドキュメント作成" })
  @ApiResponse({ status: 200, description: "ドキュメントの作成に成功" })
  async postDocument(
    @Body() postDocumentRequest: PostDocumentRequest,
  ): Promise<PostDocumentResponse> {
    const document = await this.documentService.postDocument(postDocumentRequest);
    return { id: document.id };
  }

  @Put(":id")
  @ApiOperation({ summary: "ドキュメント更新" })
  @ApiParam({
    name: "id",
    type: String,
    description: "更新対象のドキュメントID",
    example: "ckv9ydh6s0000gkpj1wybug0x",
  })
  @ApiBody({ type: PutDocumentRequest })
  @ApiResponse({
    status: 200,
    description: "ドキュメントの更新に成功",
    type: PutDocumentResponse,
  })
  async putDocument(
    @Param("id") id: string,
    @Body() body: Omit<PutDocumentRequest, "id">,
  ): Promise<PutDocumentResponse> {
    const putDocumentRequest = {
      id,
      ...body,
    };
    return this.documentService.putDocument(putDocumentRequest);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ドキュメント削除" })
  async deleteDocument(
    @Param() deleteDocumentRequest: DeleteDocumentRequest,
  ): Promise<DeleteDocumentResponse> {
    return this.documentService.deleteDocument(deleteDocumentRequest);
  }
}
