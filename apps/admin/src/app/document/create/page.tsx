"use client";
import styles from "./page.module.css";
import { Button, TextboxWithError, MarkdownEditor } from "@memory-quasar/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  const onSubmit = (data: DocumentFormData) => {
    console.log(data);
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
          onChange={(value) => {
            setValue("content", value);
          }}
        />
        <Button type="submit" label="ドキュメント作成"></Button>
      </form>
    </main>
  );
}
