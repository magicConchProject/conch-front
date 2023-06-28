import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Style from "@/css/tiptap.module.scss";
type Props = {
    data: string;
};

export default function MarkdownViewer({ data }: Props) {
    return (

        <ReactMarkdown
            className="prose"
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    let match: any = /language-(\w+)/.exec(className || "");
                    //default 는 자바스크립트로 간주
                    if (match == null) match = ["language", "javascript"];
                    return !inline && match ? (
                        <SyntaxHighlighter {...props} style={materialDark} language={match[1]} PreTag="div">
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {data}
        </ReactMarkdown>

    );
}
