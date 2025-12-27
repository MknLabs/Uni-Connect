"use client";

import { Button } from "../ui/button";
import { Check, ChevronDown } from "lucide-react";
import MODELS from "@/lib/ai/model";
import { useModel } from "@/hooks/useModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ModelSelector = () => {
    const { selectedModel, setSelectedModel } = useModel();

    const selectedModelData =
        MODELS.find((model) => model.model === selectedModel) || MODELS[0];

    const handleModelSelect = (modelId: string) => {
        setSelectedModel(modelId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex justify-center items-center text-center rounded-3xl"
                >
                    <selectedModelData.icon className="size-4" />
                    <span className="font-medium">{selectedModelData.name}</span>
                    <ChevronDown className="size-4 ml-auto" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-64 rounded-2xl bg-popover border border-border-l1 shadow-md shadow-black/5 p-1"
            >
                {/* Model options */}
                {MODELS.map((model) => (
                    <DropdownMenuItem
                        key={model.name}
                        onClick={() => handleModelSelect(model.model)}
                        className={cn(
                            "relative px-3 text-sm outline-none focus:bg-button-ghost-hover cursor-pointer select-none rounded-xl py-1.5 ps-2.5 flex flex-row items-center",
                            model.model === selectedModel && "bg-accent"
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex items-center justify-center size-4 overflow-hidden shrink-0">
                                <model.icon className="size-4 stroke-2" />
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                                <span className="font-semibold text-sm shrink-0 line-clamp-1">
                                    {model.name}
                                </span>
                                <span className="text-xs text-neutral-700 line-clamp-1">
                                    {model.description}
                                </span>
                            </div>
                        </div>
                        {model.model === selectedModel ? (
                            <Check className="ms-auto size-4 opacity-100" />
                        ) : (
                            <Check className="ms-auto size-4 opacity-0" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ModelSelector;