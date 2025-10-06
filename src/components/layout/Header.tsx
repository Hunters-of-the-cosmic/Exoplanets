import { Rocket } from "lucide-react";
import { ModelSelector } from "@/components/ModelSelector";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Rocket className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-lg font-bold text-foreground">NASA Exoplanet Detection</h1>
          <p className="text-xs text-muted-foreground">Kepler, K2 & TESS Data Analysis Platform</p>
        </div>
      </div>
      <ModelSelector />
    </header>
  );
};
