"use client";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export default function CodeBlockComponent({
    node: {
        attrs: { language: defaultLanguage },
    },
    updateAttributes,
    extension,
}: any) {
    return (
        <NodeViewWrapper className="position: relative">
            <select
                className="position: absolute right-[0.5rem] left=[0.5rem]"
                contentEditable={false}
                defaultValue={defaultLanguage}
                onChange={(event) => updateAttributes({ language: event.target.value })}
            >
                <option value="null">auto</option>
                <option disabled>—</option>
                {extension.options.lowlight.listLanguages().map((lang: any, index: any) => (
                    <option key={index} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
}
