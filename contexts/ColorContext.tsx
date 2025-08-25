"use client";
import { createContext, useContext, useState } from "react";

interface contextInterface {
  color: string;
  handleSetColor: (c: string) => void;
}

const ColorContext = createContext<contextInterface | null>(null);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("#000000");

  function handleSetColor(c: string) {
    setColor(c);
  }

  return (
    <ColorContext.Provider value={{ color, handleSetColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error(`Color context should be called within a Color Provider`);
  }

  return context;
}
