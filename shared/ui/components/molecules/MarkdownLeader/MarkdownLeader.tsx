import { marked } from "marked";

const markdownBodyStyle = "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6";

export const MarkdownLeader = ({ content }: { content: string }) => {
  const html = marked(content);
  return (
    <div
      className={`w-192 min-h-60 overflow-hidden rounded-lg border border-border bg-white p-6 ${markdownBodyStyle}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
