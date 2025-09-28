"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Product
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Resources
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Gallery
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Pricing
        </Button>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-user-avatars.png" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
