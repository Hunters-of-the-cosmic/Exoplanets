import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, Loader2, CheckCircle, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useModel } from "@/contexts/ModelContext";
import { ModelNameDialog } from "@/components/ModelNameDialog";

type TrainingState = "idle" | "training" | "complete";
type TrainingMode = "scratch" | "finetune";

export default function Training() {
  const { toast } = useToast();
  const { selectedModel, models, createModel } = useModel();
  const [state, setState] = useState<TrainingState>("idle");
  const [mode, setMode] = useState<TrainingMode>("scratch");
  const [fileName, setFileName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Configuration parameters
  const [learningRate, setLearningRate] = useState(selectedModel.parameters.learningRate);
  const [estimators, setEstimators] = useState(selectedModel.parameters.estimators);
  const [maxDepth, setMaxDepth] = useState(selectedModel.parameters.maxDepth);
  const [subsample, setSubsample] = useState(selectedModel.parameters.subsample);
  const [regularization, setRegularization] = useState(selectedModel.parameters.regularization);

  useEffect(() => {
    setLearningRate(selectedModel.parameters.learningRate);
    setEstimators(selectedModel.parameters.estimators);
    setMaxDepth(selectedModel.parameters.maxDepth);
    setSubsample(selectedModel.parameters.subsample);
    setRegularization(selectedModel.parameters.regularization);
  }, [selectedModel]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleTrain = () => {
    if (!fileName) {
      toast({
        title: "No Dataset Selected",
        description: "Please upload a dataset before training.",
        variant: "destructive",
      });
      return;
    }

    setDialogOpen(true);
  };

  const handleModelCreate = (name: string) => {
    setState("training");

    // Simulate training
    setTimeout(() => {
      createModel(name, {
        learningRate,
        estimators,
        maxDepth,
        subsample,
        regularization,
      });
      setState("complete");
      toast({
        title: "Training Complete",
        description: `Model "${name}" has been successfully trained and added to the library.`,
      });
    }, 4000);
  };

  const handleReset = () => {
    setState("idle");
    setFileName("");
  };

  return (
    <>
      <ModelNameDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleModelCreate}
        existingNames={models.map((m) => m.name)}
      />
      <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Model Configuration & Training</h1>
          <p className="text-muted-foreground">Configure parameters and train the exoplanet detection model</p>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-card border-border">
            <div className="space-y-8">
              {/* Configuration Parameters */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-foreground">Model Parameters</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Learning Rate</Label>
                      <span className="text-sm font-mono text-muted-foreground">{learningRate}</span>
                    </div>
                    <Slider
                      value={[learningRate]}
                      onValueChange={(value) => setLearningRate(value[0])}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Number of Estimators</Label>
                      <span className="text-sm font-mono text-muted-foreground">{estimators}</span>
                    </div>
                    <Slider
                      value={[estimators]}
                      onValueChange={(value) => setEstimators(value[0])}
                      min={50}
                      max={500}
                      step={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Maximum Depth</Label>
                      <span className="text-sm font-mono text-muted-foreground">{maxDepth}</span>
                    </div>
                    <Slider
                      value={[maxDepth]}
                      onValueChange={(value) => setMaxDepth(value[0])}
                      min={3}
                      max={20}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Subsample</Label>
                      <span className="text-sm font-mono text-muted-foreground">{subsample.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[subsample]}
                      onValueChange={(value) => setSubsample(value[0])}
                      min={0.5}
                      max={1}
                      step={0.05}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Regularization</Label>
                      <span className="text-sm font-mono text-muted-foreground">{regularization.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[regularization]}
                      onValueChange={(value) => setRegularization(value[0])}
                      min={0}
                      max={1}
                      step={0.05}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Training Mode */}
              <div className="space-y-3">
                <Label className="text-sm">Training Mode</Label>
                <RadioGroup value={mode} onValueChange={(value) => setMode(value as TrainingMode)}>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="scratch" id="scratch" />
                    <Label htmlFor="scratch" className="flex-1 cursor-pointer text-sm">
                      <div>
                        <p className="font-medium text-foreground">Train from Scratch</p>
                        <p className="text-xs text-muted-foreground">
                          Initialize and train a new model with your dataset
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="finetune" id="finetune" />
                    <Label htmlFor="finetune" className="flex-1 cursor-pointer text-sm">
                      <div>
                        <p className="font-medium text-foreground">Fine-tune Existing Model</p>
                        <p className="text-xs text-muted-foreground">
                          Continue training from the current model state
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dataset Upload */}
              <div className="space-y-3">
                <Label className="text-sm">Dataset Upload</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    {fileName ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">{fileName}</p>
                        <p className="text-xs text-muted-foreground mt-1">Dataset ready for training</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">Supports CSV, HDF5, or FITS formats</p>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".csv,.h5,.hdf5,.fits"
                      className="hidden"
                      id="dataset-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("dataset-upload")?.click()}
                      className="mt-2"
                    >
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {state === "idle" && (
            <Button
              onClick={handleTrain}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              Train Model
            </Button>
          )}

          {state === "training" && (
            <Card className="p-12 bg-card border-border animate-fade-in">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground">Training model...</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mode === "scratch" ? "Initializing model from scratch" : "Fine-tuning existing model"}
                  </p>
                </div>
                <div className="w-full max-w-md mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>Processing epochs...</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-pulse" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {state === "complete" && (
            <div className="space-y-4 animate-fade-in">
              <Card className="p-8 bg-success/10 border-2 border-success/30">
                <div className="flex flex-col items-center text-center space-y-4">
                  <CheckCircle className="h-20 w-20 text-success" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-success">Training Complete</h2>
                    <p className="text-foreground max-w-md">
                      The model has been successfully trained and is ready for deployment.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                      <p className="text-lg font-mono font-bold text-foreground">94.2%</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Precision</p>
                      <p className="text-lg font-mono font-bold text-foreground">91.8%</p>
                    </div>
                    <div className="p-3 bg-card rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">Recall</p>
                      <p className="text-lg font-mono font-bold text-foreground">96.5%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button onClick={handleReset} variant="outline" className="flex-1">
                  Train New Model
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  <Database className="mr-2 h-4 w-4" />
                  Deploy Model
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
