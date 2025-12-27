"use client";

import EmptyState from "@/components/Chatpage/EmptyState";
import { Composer } from "@/components/Chatpage/Composer";
import { Messages } from "@/components/Chatpage/Messages";
import { AssistantIf, ThreadPrimitive } from "@assistant-ui/react";

const ChatPage: React.FC = () => {
    return (
        <ThreadPrimitive.Root className="flex w-full h-screen flex-col bg-[#fdfdfd] dark:bg-[#141414]">
            <ThreadPrimitive.Empty>
                <EmptyState />
            </ThreadPrimitive.Empty>

            <AssistantIf condition={(s) => s.thread.isEmpty === false}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto">
                        <div className="pt-16 pb-24 px-4">
                            <ThreadPrimitive.Messages components={{ Message: Messages }} />
                            <p className="mx-auto w-full max-w-3xl p-2 text-center text-[#9a9a9a] text-xs">
                                AI can make mistakes. Verify important information.
                            </p>
                        </div>
                    </div>
                    <Composer
                        className="sticky bottom-0 left-0 right-0 pt-3 pb-4 px-4 max-w-3xl"
                        placeholder="What do you want to know?"
                    />
                </div>
            </AssistantIf>
        </ThreadPrimitive.Root>
    );
};

export default ChatPage;