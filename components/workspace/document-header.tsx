"use client";

import { useState } from "react";
import {
  Star,
  Share,
  MoreHorizontal,
  Users,
  MessageSquare,
  History,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
export function DocumentHeader() {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section - Document info */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold">Product Roadmap 2024</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Last edited 2 hours ago</span>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>3 collaborators</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>5 comments</span>
              </div>
            </div>
          </div>

          <Badge variant="secondary" className="gap-1">
            <Lock className="h-3 w-3" />
            Private
          </Badge>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2">
          {/* Collaborators */}
          <div className="flex -space-x-2 mr-2">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">AS</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback className="text-xs">MK</AvatarFallback>
            </Avatar>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsStarred(!isStarred)}
            className="h-8 w-8 p-0"
          >
            <Star
              className={`h-4 w-4 ${
                isStarred ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <History className="h-4 w-4" />
          </Button>

          <Button variant="default" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>

          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
