import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Model {
  id: string;
  name: string;
  type: "XGBoost";
  accuracy: number;
  precision: number;
  recall: number;
  createdAt: Date;
  parameters: {
    learningRate: number;
    estimators: number;
    maxDepth: number;
    subsample: number;
    regularization: number;
  };
}

interface ModelContextType {
  models: Model[];
  selectedModel: Model;
  selectModel: (id: string) => void;
  createModel: (name: string, parameters: Model["parameters"]) => void;
  deleteModel: (id: string) => void;
}

const BASE_MODEL: Model = {
  id: "base-model",
  name: "Base Model",
  type: "XGBoost",
  accuracy: 92.5,
  precision: 89.3,
  recall: 94.7,
  createdAt: new Date("2024-01-01"),
  parameters: {
    learningRate: 0.01,
    estimators: 100,
    maxDepth: 5,
    subsample: 0.8,
    regularization: 0.1,
  },
};

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<Model[]>(() => {
    const saved = localStorage.getItem("nasa-models");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((m: any) => ({
        ...m,
        createdAt: new Date(m.createdAt),
      }));
    }
    return [BASE_MODEL];
  });

  const [selectedModel, setSelectedModel] = useState<Model>(() => {
    const savedId = localStorage.getItem("nasa-selected-model");
    if (savedId) {
      const found = models.find((m) => m.id === savedId);
      if (found) return found;
    }
    return BASE_MODEL;
  });

  useEffect(() => {
    localStorage.setItem("nasa-models", JSON.stringify(models));
  }, [models]);

  useEffect(() => {
    localStorage.setItem("nasa-selected-model", selectedModel.id);
  }, [selectedModel]);

  const selectModel = (id: string) => {
    const model = models.find((m) => m.id === id);
    if (model) {
      setSelectedModel(model);
    }
  };

  const createModel = (name: string, parameters: Model["parameters"]) => {
    const newModel: Model = {
      id: `model-${Date.now()}`,
      name,
      type: "XGBoost",
      accuracy: 91 + Math.random() * 5,
      precision: 88 + Math.random() * 5,
      recall: 93 + Math.random() * 5,
      createdAt: new Date(),
      parameters,
    };
    setModels((prev) => [...prev, newModel]);
    setSelectedModel(newModel);
  };

  const deleteModel = (id: string) => {
    if (id === "base-model") return;
    setModels((prev) => prev.filter((m) => m.id !== id));
    if (selectedModel.id === id) {
      setSelectedModel(BASE_MODEL);
    }
  };

  return (
    <ModelContext.Provider
      value={{ models, selectedModel, selectModel, createModel, deleteModel }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within ModelProvider");
  }
  return context;
}
