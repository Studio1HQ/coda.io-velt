"use client";

import { Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useSetDocument, VeltComments, VeltCommentTool } from "@veltdev/react";
import useTheme from "../hooks/use-theme";

const workspaceMembers = [
  {
    id: "1",
    name: "David Weitzman",
    email: "david@example.com",
    avatar: "/david-statue.png",
    lastActive: "Today",
    docsOwned: 1,
    joinedOn: "Mar 4th",
    role: "Doc Maker",
    status: "pending",
    initials: "D",
  },
  {
    id: "2",
    name: "Luis Curiel",
    email: "luis@example.com",
    avatar: "/luis.jpg",
    lastActive: "Mar 24th",
    docsOwned: 0,
    joinedOn: "Jan 4th",
    role: "Doc Maker",
    status: "pending",
    initials: "L",
  },
  {
    id: "3",
    name: "Adil Tobaa",
    email: "adil@example.com",
    avatar: "/adil.jpg",
    lastActive: "Feb 28th",
    docsOwned: 8,
    joinedOn: "Jun 16th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "A",
  },
  {
    id: "4",
    name: "Alexander Zhao",
    email: "alex@example.com",
    avatar: "/alexander.jpg",
    lastActive: "Mar 24th",
    docsOwned: 11,
    joinedOn: "Jun 15th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "A",
  },
  {
    id: "5",
    name: "Andrew Hsu",
    email: "andrew@example.com",
    avatar: "/andrew.jpg",
    lastActive: "Mar 9th",
    docsOwned: 6,
    joinedOn: "Jan 13th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "A",
  },
  {
    id: "6",
    name: "Bala Neerumalla",
    email: "bala@example.com",
    avatar: "/bala.jpg",
    lastActive: "Mar 17th",
    docsOwned: 4,
    joinedOn: "Apr 28th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "B",
  },
  {
    id: "7",
    name: "Ben Lieber",
    email: "ben@example.com",
    avatar: "/ben.jpg",
    lastActive: "Mar 22nd",
    docsOwned: 45,
    joinedOn: "Jan 6th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "B",
  },
  {
    id: "8",
    name: "Carlo Joeraes",
    email: "carlo@example.com",
    avatar: "/carlo.jpg",
    lastActive: "Mar 23rd",
    docsOwned: 19,
    joinedOn: "Jun 7th, 2021",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "C",
  },
  {
    id: "9",
    name: "Christopher Eck",
    email: "chris@example.com",
    avatar: "/christopher.jpg",
    lastActive: "Mar 18th",
    docsOwned: 58,
    joinedOn: "Sep 22nd, 2019",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "C",
  },
  {
    id: "10",
    name: "David Kossnick",
    email: "davidk@example.com",
    avatar: "/davidk.jpg",
    lastActive: "Feb 25th",
    docsOwned: 20,
    joinedOn: "Oct 6th, 2020",
    role: "Doc Maker (Admin)",
    status: "active",
    initials: "D",
  },
];

const CodoTable = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { theme } = useTheme();
  useSetDocument("coda-inventory", { documentName: "workspace-management" });

  return (
    <>
      <VeltComments
        popoverMode={true}
        customAutocompleteSearch={true}
        darkMode={theme === "dark"}
      />
      <div className="bg-card rounded-lg border border-border">
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-1">
              <Checkbox />
            </div>
            <div className="col-span-3 flex items-center">Member</div>
            <div className="col-span-2 flex items-center">
              Last active
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>When this member was last active</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-2 flex items-center">
              Docs owned
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of documents owned by this member</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-2 flex items-center">
              Joined on
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>When this member joined the workspace</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-2 flex items-center">
              Workspace role
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Role and permissions in this workspace</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {workspaceMembers.map((member, index) => (
              <div
                key={member.id}
                className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-muted/30"
              >
                <div className="col-span-1">
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMembers([...selectedMembers, member.id]);
                      } else {
                        setSelectedMembers(
                          selectedMembers.filter((id) => id !== member.id)
                        );
                      }
                    }}
                  />
                </div>
                <div className="col-span-3 flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback className="bg-green-500 text-white text-sm">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">
                      {member.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.email}
                    </div>
                  </div>
                </div>
                <div
                  className="col-span-2 text-sm text-foreground relative flex justify-between items-center"
                  id={member.lastActive + index}
                >
                  {member.lastActive}
                  <div className="rounded-full transition-colors cursor-pointer">
                    <VeltCommentTool
                      targetElementId={member.lastActive + index}
                      style={{ width: "18px", height: "18px" }}
                      darkMode={theme === "dark"}
                    />
                  </div>
                </div>
                <div className="col-span-2 text-sm text-foreground">
                  {member.docsOwned} docs
                </div>
                <div className="col-span-2 text-sm text-foreground">
                  {member.joinedOn}
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-foreground">{member.role}</div>
                    {member.status === "pending" && (
                      <div className="text-xs text-orange-600 dark:text-orange-400">
                        Becomes Doc Maker in 19 hrs
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodoTable;
