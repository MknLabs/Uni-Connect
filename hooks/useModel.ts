import { createContext, useContext } from "react";

interface ModelContextType {
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

export const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function useModel() {
    const context = useContext(ModelContext);
    if (!context) {
        throw new Error("useModel must be used within ModelProvider");
    }
    return context;
}
