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
  createdAt: string;
  updatedAt: string;
};

export type DocumentFormData = {
  title: string;
  content: string;
};
