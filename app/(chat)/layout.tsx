"use client";

import { useState } from "react";
import { ModelContext } from "@/hooks/useModel";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { QueryDatabaseUI } from "@/components/Chatpage/tools/QueryDatabaseUI";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedModel, setSelectedModel] = useState<string>("gpt-4o-mini");

    const runtime = useChatRuntime({
        transport: new AssistantChatTransport({
            api: "/api/chat",
            body: { model: selectedModel },
        }),
    });

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <QueryDatabaseUI />
            <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
                {children}
            </ModelContext.Provider>
        </AssistantRuntimeProvider>
    );
}
