import { ActionBarPrimitive, AssistantIf, MessagePrimitive } from "@assistant-ui/react";
import { MarkdownText } from "./MarkdownText";
import { Pencil1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { CopyIcon, ThumbsDown, ThumbsUp } from "lucide-react";

export const Messages: React.FC = () => {
    return (
        <MessagePrimitive.Root className="group/message relative mx-auto mb-2 flex w-full max-w-3xl flex-col pb-0.5">
            <AssistantIf condition={(s) => s.message.role === "user"}>
                <div className="flex flex-col items-end">
                    <div className="relative max-w-[90%] rounded-3xl rounded-br-lg border border-[#e5e5e5] bg-[#f0f0f0] px-4 py-3 text-[#0d0d0d] dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:text-white">
                        <div className="prose prose-sm dark:prose-invert wrap-break-word">
                            <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
                        </div>
                    </div>
                    <div className="mt-1 flex h-8 items-center justify-end gap-0.5 opacity-0 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
                        <ActionBarPrimitive.Root className="flex items-center gap-0.5">
                            <ActionBarPrimitive.Edit className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <Pencil1Icon width={16} height={16} />
                            </ActionBarPrimitive.Edit>
                            <ActionBarPrimitive.Copy className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <CopyIcon width={16} height={16} />
                            </ActionBarPrimitive.Copy>
                        </ActionBarPrimitive.Root>
                    </div>
                </div>
            </AssistantIf>

            <AssistantIf condition={(s) => s.message.role === "assistant"}>
                <div className="flex flex-col items-start">
                    <div className="w-full max-w-none">
                        <div className="prose prose-sm wrap-break-word dark:prose-invert prose-li:my-1 prose-ol:my-1 prose-p:my-2 prose-ul:my-1 text-[#0d0d0d] dark:text-[#e5e5e5]">
                            <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
                        </div>
                    </div>
                    <div className="mt-1 flex h-8 w-full items-center justify-start gap-0.5 opacity-0 transition-opacity group-focus-within/message:opacity-100 group-hover/message:opacity-100">
                        <ActionBarPrimitive.Root className="-ml-2 flex items-center gap-0.5">
                            <ActionBarPrimitive.Reload className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <ReloadIcon width={16} height={16} />
                            </ActionBarPrimitive.Reload>
                            <ActionBarPrimitive.Copy className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <CopyIcon width={16} height={16} />
                            </ActionBarPrimitive.Copy>
                            <ActionBarPrimitive.FeedbackPositive className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <ThumbsUp width={16} height={16} />
                            </ActionBarPrimitive.FeedbackPositive>
                            <ActionBarPrimitive.FeedbackNegative className="flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b6b] transition-colors hover:bg-[#e5e5e5] hover:text-[#0d0d0d] dark:text-[#9a9a9a] dark:hover:bg-[#2a2a2a] dark:hover:text-white">
                                <ThumbsDown width={16} height={16} />
                            </ActionBarPrimitive.FeedbackNegative>
                        </ActionBarPrimitive.Root>
                    </div>
                </div>
            </AssistantIf>
        </MessagePrimitive.Root>
    );
};