import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useModel } from "@/contexts/ModelContext";

export function ModelSelector() {
  const { models, selectedModel, selectModel } = useModel();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-card border-border">
          <span className="text-sm font-medium">{selectedModel.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border z-50">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => selectModel(model.id)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="font-medium text-foreground">{model.name}</p>
                <p className="text-xs text-muted-foreground">
                  Acc: {model.accuracy.toFixed(1)}%
                </p>
              </div>
              {selectedModel.id === model.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
