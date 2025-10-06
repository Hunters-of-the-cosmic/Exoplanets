import { useModel } from "@/contexts/ModelContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Check } from "lucide-react";
import { format } from "date-fns";

export default function ModelLibrary() {
  const { models, selectedModel, selectModel, deleteModel } = useModel();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Model Library</h1>
          <p className="text-muted-foreground">
            View and manage all trained models
          </p>
        </div>

        <Card className="bg-card border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Model Name</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Accuracy</TableHead>
                <TableHead className="text-muted-foreground">Precision</TableHead>
                <TableHead className="text-muted-foreground">Recall</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow
                  key={model.id}
                  className={`border-border cursor-pointer hover:bg-secondary/50 ${
                    selectedModel.id === model.id ? "bg-primary/5" : ""
                  }`}
                  onClick={() => selectModel(model.id)}
                >
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {model.name}
                      {selectedModel.id === model.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{model.type}</TableCell>
                  <TableCell className="font-mono text-foreground">
                    {model.accuracy.toFixed(1)}%
                  </TableCell>
                  <TableCell className="font-mono text-foreground">
                    {model.precision.toFixed(1)}%
                  </TableCell>
                  <TableCell className="font-mono text-foreground">
                    {model.recall.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(model.createdAt, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    {model.id !== "base-model" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteModel(model.id);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
