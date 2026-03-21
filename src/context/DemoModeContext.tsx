import { createContext, useContext, useState, ReactNode } from "react";

interface DemoModeContextValue {
  isDemoActive: boolean;
  toggleDemo: () => void;
  activateDemo: () => void;
  deactivateDemo: () => void;
}

const DemoModeContext = createContext<DemoModeContextValue | null>(null);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoActive, setIsDemoActive] = useState(false);

  const toggleDemo = () => setIsDemoActive((v) => !v);
  const activateDemo = () => setIsDemoActive(true);
  const deactivateDemo = () => setIsDemoActive(false);

  return (
    <DemoModeContext.Provider
      value={{ isDemoActive, toggleDemo, activateDemo, deactivateDemo }}
    >
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode(): DemoModeContextValue {
  const ctx = useContext(DemoModeContext);
  if (!ctx) {
    throw new Error("useDemoMode must be used inside <DemoModeProvider>");
  }
  return ctx;
}
