"use client";
import styles from "./page.module.css";
import { Button, TextboxWithError, MarkdownEditor } from "@memory-quasar/shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DocumentVisibility } from "@memory-quasar/shared/utils/repository/document/type";
import { useSession } from "next-auth/react";
import { fetcher } from "@memory-quasar/shared/utils/repository/fetcher";
const documentSchema = z.object({
  title: z.string().min(1, { message: "ドキュメントタイトルを入力してください" }).nullable(),
  content: z.string().nullable(),
});

type DocumentFormData = z.infer<typeof documentSchema>;

export default function DocumentCreatePage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const { data: session } = useSession();

  const onSubmit = async (data: DocumentFormData) => {
    fetcher({
      uri: "/documents",
      method: "POST",
      body: {
        ...data,
        visibility: DocumentVisibility.PUBLIC,
        userName: session?.user?.name,
        userId: session?.user?.id,
        spaceId: session?.user?.spaceId,
      },
    });
  };

  return (
    <main>
      <h1>ドキュメント新規作成</h1>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <TextboxWithError
          label="ドキュメントタイトル"
          size="full"
          {...register("title")}
          error={errors.title?.message}
        />
        <MarkdownEditor
          label="ドキュメント内容"
          className={styles.markdownEditor}
          {...register("content")}
          onChange={(value: string) => {
            setValue("content", value);
          }}
        />
        <Button type="submit" label="ドキュメント作成"></Button>
      </form>
    </main>
  );
}
