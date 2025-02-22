export enum DocumentVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  SPACE = "SPACE",
}

export type Document = {
  id: string;
  title: string;
  content: string;
  visibility: DocumentVisibility;
  userId: string;
  spaceId: string | null;
  userName: string;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DocumentFormData = {
  title: string;
  content: string;
};

export type PostDocumentRequest = {
  title: string;
  content: string;
};

export type PostDocumentResponse = {
  id: string;
};

export type GetDocumentResponse = {
  document: Document;
};

export type GetDocumentListResponse = {
  documents: Document[];
};

export type GetDocumentListRequest = {
  userId: string;
  spaceId: string;
};

export type DeleteDocumentRequest = {
  id: string;
};

export type DeleteDocumentResponse = {
  id: string;
};

export type UpdateDocumentRequest = {
  id: string;
  title: string;
  content: string;
};

export type UpdateDocumentResponse = {
  id: string;
};
