"use client";
import { forwardRef } from "react";
import dynamic from "next/dynamic";
import type { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./MarkdownEditor.module.css";

export interface MarkdownEditorProps extends SimpleMDEReactProps {
  label: string;
  className?: string;
  id?: string;
}

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({ label, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <SimpleMDE id={inputId} className={`${styles.editor} ${className}`} {...props} ref={ref} />
    );
  },
);

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
