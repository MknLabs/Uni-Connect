"use client";

import { cn } from "@/lib/utils";
import ModelSelector from "./ModelSelector";
import { useShallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ArrowUpIcon, Mic, Paperclip, Square } from "lucide-react";
import {
    AssistantIf,
    AttachmentPrimitive,
    ComposerPrimitive,
    useAssistantState
} from "@assistant-ui/react";

export const Composer = ({ className, placeholder }: {
    className?: string;
    placeholder: string;
}) => {
    const isEmpty = useAssistantState((s) => s.composer.isEmpty);
    const isRunning = useAssistantState((s) => s.thread.isRunning);

    return (
        <ComposerPrimitive.Root
            className={cn("group/composer mb-3 w-full mx-auto", className)}
            data-empty={isEmpty}
            data-running={isRunning}
        >
            <div className="overflow-hidden rounded-full bg-white shadow-sm border border-neutral-200 ring-inset transition-shadow focus-within:ring-neutral-700 dark:bg-[#212121] dark:ring-[#2a2a2a] dark:focus-within:ring-[#3a3a3a]">
                <AssistantIf condition={(s) => s.composer.attachments.length > 0}>
                    <div className="flex flex-row flex-wrap gap-2 px-4 pt-3">
                        <ComposerPrimitive.Attachments
                            components={{ Attachment: GrokAttachment }}
                        />
                    </div>
                </AssistantIf>

                <div className="flex items-end gap-1 p-2">
                    <ComposerPrimitive.AddAttachment className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#0d0d0d] transition-colors hover:bg-[#f0f0f0] dark:text-white dark:hover:bg-[#2a2a2a]">
                        <Paperclip width={18} height={18} />
                    </ComposerPrimitive.AddAttachment>

                    <ComposerPrimitive.Input
                        placeholder={placeholder}
                        minRows={1}
                        className="my-2 h-6 max-h-100 min-w-0 flex-1 resize-none bg-transparent text-[#0d0d0d] text-base leading-6 outline-none placeholder:text-[#9a9a9a] dark:text-white dark:placeholder:text-[#6b6b6b]"
                    />

                    <ModelSelector />

                    <div className="relative mb-0.5 h-9 w-9 shrink-0 rounded-full bg-[#0d0d0d] text-white dark:bg-white dark:text-[#0d0d0d]">
                        <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-data-[empty=false]/composer:scale-0 group-data-[running=true]/composer:scale-0 group-data-[empty=false]/composer:opacity-0 group-data-[running=true]/composer:opacity-0"
                            aria-label="Voice mode"
                        >
                            <Mic width={18} height={18} />
                        </button>

                        <ComposerPrimitive.Send className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-data-[empty=true]/composer:scale-0 group-data-[running=true]/composer:scale-0 group-data-[empty=true]/composer:opacity-0 group-data-[running=true]/composer:opacity-0">
                            <ArrowUpIcon width={18} height={18} />
                        </ComposerPrimitive.Send>

                        <ComposerPrimitive.Cancel className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out group-data-[running=false]/composer:scale-0 group-data-[running=false]/composer:opacity-0">
                            <Square width={14} height={14} fill="currentColor" />
                        </ComposerPrimitive.Cancel>
                    </div>
                </div>
            </div>
        </ComposerPrimitive.Root>
    );
};

const useAttachmentSrc = () => {
    const { file, src } = useAssistantState(
        useShallow(({ attachment }): { file?: File; src?: string } => {
            if (attachment.type !== "image") return {};
            if (attachment.file) return { file: attachment.file };
            const src = attachment.content?.filter((c) => c.type === "image")[0]
                ?.image;
            if (!src) return {};
            return { src };
        }),
    );

    const [fileSrc, setFileSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!file) {
            setFileSrc(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setFileSrc(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return fileSrc ?? src;
};

const GrokAttachment: React.FC = () => {
    const src = useAttachmentSrc();

    return (
        <AttachmentPrimitive.Root className="group/attachment relative">
            <div className="flex h-12 items-center gap-2 overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#f0f0f0] p-0.5 transition-colors hover:border-[#d0d0d0] dark:border-[#2a2a2a] dark:bg-[#252525] dark:hover:border-[#3a3a3a]">
                <AssistantIf
                    condition={({ attachment }) => attachment.type === "image"}
                >
                    {src ? (
                        <img
                            className="h-full w-12 rounded-[9px] object-cover"
                            alt="Attachment"
                            src={src}
                        />
                    ) : (
                        <div className="flex h-full w-12 items-center justify-center rounded-[9px] bg-[#e5e5e5] text-[#6b6b6b] dark:bg-[#3a3a3a] dark:text-[#9a9a9a]">
                            <AttachmentPrimitive.unstable_Thumb className="text-xs" />
                        </div>
                    )}
                </AssistantIf>
                <AssistantIf
                    condition={({ attachment }) => attachment.type !== "image"}
                >
                    <div className="flex h-full w-12 items-center justify-center rounded-[9px] bg-[#e5e5e5] text-[#6b6b6b] dark:bg-[#3a3a3a] dark:text-[#9a9a9a]">
                        <AttachmentPrimitive.unstable_Thumb className="text-xs" />
                    </div>
                </AssistantIf>
            </div>
            <AttachmentPrimitive.Remove className="absolute -top-1.5 -right-1.5 flex h-6 w-6 scale-50 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#6b6b6b] opacity-0 transition-all hover:bg-[#f5f5f5] hover:text-[#0d0d0d] group-hover/attachment:scale-100 group-hover/attachment:opacity-100 dark:border-[#3a3a3a] dark:bg-[#1a1a1a] dark:text-[#9a9a9a] dark:hover:bg-[#252525] dark:hover:text-white">
                <Cross2Icon width={14} height={14} />
            </AttachmentPrimitive.Remove>
        </AttachmentPrimitive.Root>
    );
};