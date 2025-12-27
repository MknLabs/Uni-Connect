"use client";

import { useState } from "react";
import { ModelContext } from "@/hooks/useModel";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedModel, setSelectedModel] = useState<string>("gpt-4o-mini");

    return (
        <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
            {children}
        </ModelContext.Provider>
    );
}
