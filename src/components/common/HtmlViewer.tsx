"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { useEditor, EditorContent, ReactNodeViewRenderer, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Style from "@/css/tiptap.module.scss";

import { CodeBlockLowlight, CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import CodeBlockComponent from "./CodeBlockComponent";
import { lowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { useEffect } from "react";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

type Props = {
    text?: string;
};

export default function HtmlViewer({ text }: Props) {

    const editor = useEditor({
        editable: false,
        extensions: [
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                codeBlock: false,
            }),

            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({ lowlight } as any),
        ],
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
            },
        },
        content: text,
    });    
    useEffect(() => {
        editor?.commands.setContent(text as Content);
    }, [text]);
    return (
        <div>
            <EditorContent className={`${Style.ProseMirror}`} editor={editor} />
        </div>
    );
}
