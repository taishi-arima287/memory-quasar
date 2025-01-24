"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DocumentVisibility } from "@memory-quasar/shared/utils/repository/document/type";
import { clientFetcher } from "@memory-quasar/shared/utils/repository/clientFetcher";
import { useRouter } from "next/navigation";
import { Document } from "@memory-quasar/shared/utils/repository/document/type";
import { Button, TextboxWithError, MarkdownEditor } from "@memory-quasar/shared/ui";
import styles from "./update.module.css";

const documentSchema = z.object({
  title: z.string().min(1, { message: "ドキュメントタイトルを入力してください" }).nullable(),
  content: z.string().nullable(),
});

type DocumentFormData = z.infer<typeof documentSchema>;

export const Update = ({ document }: { document: Document }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: document.title || "",
      content: document.content || "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: DocumentFormData) => {
    try {
      const result = await clientFetcher({
        uri: `/document/${document.id}`,
        method: "PUT",
        body: {
          ...data,
          thumbnail: "",
          visibility: DocumentVisibility.PUBLIC,
        },
      });

      if (!result.ok) {
        router.push(
          `/error-page?message=${encodeURIComponent(result.error || "")}&returnPath=${encodeURIComponent(`/document/update/${document.id}`)}`,
        );
        return;
      }
      router.push("/document");
    } catch (error: unknown) {
      router.push(
        `/error-page?message=${encodeURIComponent(error instanceof Error ? error.message : "予期せぬエラーが発生しました")}&returnPath=${encodeURIComponent("/document/create")}`,
      );
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>ドキュメント更新</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextboxWithError
          label="ドキュメントタイトル"
          size="full"
          {...register("title")}
          error={errors.title?.message}
          placeholder="ドキュメントタイトルを入力してください"
        />
        <MarkdownEditor
          label="ドキュメント内容"
          className={styles.markdownEditor}
          defaultValue={document.content}
          {...register("content")}
          onChange={(value: string) => {
            setValue("content", value, { shouldValidate: true });
          }}
          placeholder="ドキュメント内容を入力してください"
        />
        <Button type="submit" label="ドキュメント更新" disabled={!isValid}></Button>
      </form>
    </main>
  );
};
