import { marked } from "marked";
import styles from "./MarkdownLeader.module.css";
export const MarkdownLeader = ({ content }: { content: string }) => {
  const html = marked(content);
  return <div className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />;
};
