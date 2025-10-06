import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Globe, AlertTriangle, XCircle } from "lucide-react";

type DetectionState = "idle" | "searching" | "result";
type ResultType = "exoplanet" | "candidate" | "false-positive";

export default function Detection() {
  const [state, setState] = useState<DetectionState>("idle");
  const [result, setResult] = useState<ResultType | null>(null);
  const [formData, setFormData] = useState({
    orbitalPeriod: "",
    transitDuration: "",
    planetaryRadius: "",
    transitDepth: "",
    stellarFlux: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("searching");

    // Simulate API call
    setTimeout(() => {
      // Random result for demo
      const results: ResultType[] = ["exoplanet", "candidate", "false-positive"];
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setResult(randomResult);
      setState("result");
    }, 2500);
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setFormData({
      orbitalPeriod: "",
      transitDuration: "",
      planetaryRadius: "",
      transitDepth: "",
      stellarFlux: "",
    });
  };

  const getResultConfig = (type: ResultType) => {
    switch (type) {
      case "exoplanet":
        return {
          icon: Globe,
          title: "Exoplanet Detected",
          description: "High confidence detection. The transit signature matches known exoplanet characteristics.",
          color: "text-success",
          bg: "bg-success/10",
          border: "border-success/30",
        };
      case "candidate":
        return {
          icon: AlertTriangle,
          title: "Planetary Candidate",
          description: "Moderate confidence. Further observation recommended to confirm exoplanet status.",
          color: "text-warning",
          bg: "bg-warning/10",
          border: "border-warning/30",
        };
      case "false-positive":
        return {
          icon: XCircle,
          title: "False Positive",
          description: "Low confidence. The signal is likely caused by stellar activity or instrumental noise.",
          color: "text-destructive",
          bg: "bg-destructive/10",
          border: "border-destructive/30",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Exoplanet Detection</h1>
          <p className="text-muted-foreground">
            Input observational parameters to analyze potential exoplanet transits
          </p>
        </div>

        {state === "idle" && (
          <Card className="p-6 bg-card border-border animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orbitalPeriod">Orbital Period (days)</Label>
                  <Input
                    id="orbitalPeriod"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 365.25"
                    value={formData.orbitalPeriod}
                    onChange={(e) => setFormData({ ...formData, orbitalPeriod: e.target.value })}
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transitDuration">Transit Duration (hours)</Label>
                  <Input
                    id="transitDuration"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 13.0"
                    value={formData.transitDuration}
                    onChange={(e) => setFormData({ ...formData, transitDuration: e.target.value })}
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planetaryRadius">Planetary Radius (Earth radii)</Label>
                  <Input
                    id="planetaryRadius"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1.0"
                    value={formData.planetaryRadius}
                    onChange={(e) => setFormData({ ...formData, planetaryRadius: e.target.value })}
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transitDepth">Transit Depth (ppm)</Label>
                  <Input
                    id="transitDepth"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 84.0"
                    value={formData.transitDepth}
                    onChange={(e) => setFormData({ ...formData, transitDepth: e.target.value })}
                    required
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stellarFlux">Stellar Flux (relative to Earth)</Label>
                  <Input
                    id="stellarFlux"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1.0"
                    value={formData.stellarFlux}
                    onChange={(e) => setFormData({ ...formData, stellarFlux: e.target.value })}
                    required
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Search Exoplanets
              </Button>
            </form>
          </Card>
        )}

        {state === "searching" && (
          <Card className="p-12 bg-card border-border animate-fade-in">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-lg text-muted-foreground">Searching for exoplanets...</p>
              <p className="text-sm text-muted-foreground">Analyzing transit data</p>
            </div>
          </Card>
        )}

        {state === "result" && result && (
          <div className="space-y-4 animate-fade-in">
            <Card
              className={`p-8 ${getResultConfig(result).bg} border-2 ${getResultConfig(result).border}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {(() => {
                  const Icon = getResultConfig(result).icon;
                  return <Icon className={`h-20 w-20 ${getResultConfig(result).color}`} />;
                })()}
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${getResultConfig(result).color}`}>
                    {getResultConfig(result).title}
                  </h2>
                  <p className="text-foreground max-w-md">{getResultConfig(result).description}</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                New Search
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">Export Results</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
