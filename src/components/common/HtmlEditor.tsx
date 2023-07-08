"use client";

type Props = {
    getChange: (value: string | undefined) => void;
    content?: string;
};

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Style from "@/css/tiptap.module.scss";
import { CodeBlockLowlight, CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import CodeBlockComponent from "./CodeBlockComponent";
import { lowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import ParagraphIcon from "../icons/texteditor/ParagraphIcon";
import BoldIcon from "../icons/texteditor/BoldIcon";
import ItalicIcon from "../icons/texteditor/ItalicIcon";
import StrikeIcon from "../icons/texteditor/StrikeIcon";
import CodeIcon from "../icons/texteditor/CodeIcon";
import BulletListIcon from "../icons/texteditor/BulletListIcon";
import Heading1Icon from "../icons/texteditor/Heading1Icon";
import Heading2Icon from "../icons/texteditor/Heading2Icon";
import Heading3Icon from "../icons/texteditor/Heading3Icon";
import Heading4Icon from "../icons/texteditor/Heading4Icon";
import Heading5Icon from "../icons/texteditor/Heading5Icon";
import Heading6Icon from "../icons/texteditor/Heading6Icon";
import OrderedListIcon from "../icons/texteditor/OrderedListIcon";
import CodeBlockIcon from "../icons/texteditor/CodeBlockIcon";
import BlockquoteIcon from "../icons/texteditor/BlockquoteIcon";
import TextColorPurpleIcon from "../icons/texteditor/TextColorPurpleIcon";
import HorizontalRuleIcon from "../icons/texteditor/HorizontalRuleIcon";
import HardBreakIcon from "../icons/texteditor/HardBreakIcon";
import ClearMarkIcon from "../icons/texteditor/ClearMarkIcon";
import ClearNodeIcon from "../icons/texteditor/ClearNodeIcon";
import UndoIcon from "../icons/texteditor/UndoIcon";
import RedoIcon from "../icons/texteditor/RedoIcon";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const is_active = "bg-teal-600 text-neutral-50 px-2 rounded-md py-1";

const is_not_active = "text-gray-700 px-2 rounded-md py-1 hover:bg-gray-100";

const MenuBar = ({ editor }: any) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex gap-2 flex-wrap ">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().setParagraph().run();
                }}
                className={editor.isActive("paragraph") ? is_active : is_not_active}
            >
                <ParagraphIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={editor.isActive("heading", { level: 1 }) ? is_active : is_not_active}
            >
                <Heading1Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={editor.isActive("heading", { level: 2 }) ? is_active : is_not_active}
            >
                <Heading2Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={editor.isActive("heading", { level: 3 }) ? is_active : is_not_active}
            >
                <Heading3Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 4 }).run();
                }}
                className={editor.isActive("heading", { level: 4 }) ? is_active : is_not_active}
            >
                <Heading4Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 5 }).run();
                }}
                className={editor.isActive("heading", { level: 5 }) ? is_active : is_not_active}
            >
                <Heading5Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({ level: 6 }).run();
                }}
                className={editor.isActive("heading", { level: 6 }) ? is_active : is_not_active}
            >
                <Heading6Icon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBold().run();
                }}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? is_active : is_not_active}
            >
                <BoldIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleItalic().run();
                }}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? is_active : is_not_active}
            >
                <ItalicIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleStrike().run();
                }}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? is_active : is_not_active}
            >
                <StrikeIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleCode().run();
                }}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? is_active : is_not_active}
            >
                <CodeIcon />
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBulletList().run();
                }}
                className={editor.isActive("bulletList") ? is_active : is_not_active}
            >
                <BulletListIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleOrderedList().run();
                }}
                className={editor.isActive("orderedList") ? is_active : is_not_active}
            >
                <OrderedListIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleCodeBlock().run();
                }}
                className={editor.isActive("codeBlock") ? is_active : is_not_active}
            >
                <CodeBlockIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBlockquote().run();
                }}
                className={editor.isActive("blockquote") ? is_active : is_not_active}
            >
                <BlockquoteIcon />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().setColor("#958DF1").run();
                }}
                className={editor.isActive("textStyle", { color: "#958DF1" }) ? is_active : is_not_active}
            >
                <TextColorPurpleIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().setHorizontalRule().run();
                }}
            >
                <HorizontalRuleIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().setHardBreak().run();
                }}
            >
                <HardBreakIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().unsetAllMarks().run();
                }}
            >
                <ClearMarkIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().clearNodes().run();
                }}
            >
                <ClearNodeIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().undo().run();
                }}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <UndoIcon />
            </button>
            <button
                className={is_not_active}
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().redo().run();
                }}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <RedoIcon />
            </button>
        </div>
    );
};

export default function MarkdownEditor({ getChange, content = "" }: Props) {
    const editor = useEditor({
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
        content,
    });

    getChange(editor?.getHTML());

    return (
        <div className="border-2 border-gray-200 rounded-md">
            <div className="border-b p-1">
                <MenuBar editor={editor} />
            </div>
            
            <div>
                <EditorContent className={Style.ProseMirror} editor={editor} />
            </div>
        </div>
    );
}
