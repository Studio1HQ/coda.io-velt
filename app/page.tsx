"use client";
import { Topbar } from "@/components/workspace/topbar";

import { Sidebar } from "@/components/workspace/sidebar";
import { MainContent } from "@/components/workspace/main-content";
import { ThemeProvider } from "@/components/hooks/use-theme";
import { VeltProvider } from "@veltdev/react";

export default function WorkspacePage() {
  return (
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_ID || ""}>
      <ThemeProvider>
        <div className="h-screen flex flex-col bg-background">
          <Topbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <MainContent />
          </div>
        </div>
      </ThemeProvider>
    </VeltProvider>
  );
}
