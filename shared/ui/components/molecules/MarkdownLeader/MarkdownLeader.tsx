import { marked } from "marked";

export const MarkdownLeader = ({ content }: { content: string }) => {
  const html = marked(content);
  return (
    <div
      className="w-192 min-h-60 overflow-hidden rounded-lg border border-border bg-white p-6"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
