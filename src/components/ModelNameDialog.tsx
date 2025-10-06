import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModelNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string) => void;
  existingNames: string[];
}

export function ModelNameDialog({
  open,
  onOpenChange,
  onConfirm,
  existingNames,
}: ModelNameDialogProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError("Model name is required");
      return;
    }

    if (existingNames.includes(trimmedName)) {
      setError("A model with this name already exists");
      return;
    }

    onConfirm(trimmedName);
    setName("");
    setError("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Name Your Model</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Give your trained model a unique name to identify it in the library.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="model-name" className="text-sm">
            Model Name
          </Label>
          <Input
            id="model-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g., High Precision Model"
            className="bg-background border-border"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirm();
              }
            }}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90">
            Create Model
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
