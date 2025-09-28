"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSetDocument, VeltComments, VeltCommentTool } from "@veltdev/react";
import useTheme from "../hooks/use-theme";

// --- Same data as before ---
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

// Safe, deterministic DOM IDs for Velt targets
const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, "_");
const cellId = (memberId: string, col: string) =>
  `velt-cell-${safeId(memberId)}__${col}`;

export default function CodoTable() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { theme } = useTheme();
  useSetDocument("coda-inventory", { documentName: "workspace-management" });

  const allIds = useMemo(() => workspaceMembers.map((m) => m.id), []);
  const toggleOne = (id: string, checked: boolean) =>
    setSelectedMembers((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

  return (
    <>
      <VeltComments
        popoverMode
        customAutocompleteSearch
        darkMode={theme === "dark"}
      />

      <div className=" bg-card border border-border overflow-scroll">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {/* No checkbox and no Velt in header */}
              <TableHead className="w-[40px]">Select</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>
                <span className="inline-flex items-center">
                  Last active
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1 inline-flex">
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>When this member was last active</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center">
                  Docs owned
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1 inline-flex">
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of documents owned by this member</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center">
                  Joined on
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1 inline-flex">
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>When this member joined the workspace</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center">
                  Workspace role
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="ml-1 inline-flex">
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Role and permissions in this workspace</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {workspaceMembers.map((member, index) => {
              const isChecked = selectedMembers.includes(member.id);

              return (
                <TableRow key={member.id} className="hover:bg-muted/30">
                  {/* Select (row only) */}
                  <TableCell className="p-4">
                    <div>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(c) =>
                          toggleOne(member.id, Boolean(c))
                        }
                        aria-label={`Select ${member.name}`}
                      />
                    </div>
                  </TableCell>

                  {/* Member */}
                  <TableCell className="!p-0 border">
                    <div
                      id={`velt-comments-${member.name}+${member.email}+${member.id}+${index}`}
                      className="group flex items-center justify-between gap-2 pl-2 !py-2"
                    >
                      <div className="flex items-center">
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
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <VeltCommentTool
                          targetElementId={`velt-comments-${member.name}+${member.email}+${member.id}+${index}`}
                          style={{ width: 18, height: 18 }}
                          darkMode={theme === "dark"}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Last active */}
                  <TableCell className="!p-0 border">
                    <div
                      id={`velt-comments-${member.lastActive}+${member.id}+${index}`}
                      className="group flex items-center justify-between gap-2 pl-2"
                    >
                      <div className="my-[10px]">
                        <div className="text-sm text-foreground">
                          Activity Status:{" "}
                        </div>
                        <div className="text-xs text-green-600 dark:text-orange-400">
                          {member.lastActive}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <VeltCommentTool
                          targetElementId={`velt-comments-${member.lastActive}+${member.id}+${index}`}
                          style={{ width: 18, height: 18 }}
                          darkMode={theme === "dark"}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Docs owned */}
                  <TableCell className="!p-0 border">
                    <div
                      id={`velt-comments-${member.docsOwned}+${member.id}+${index}`}
                      className="group flex items-center justify-between gap-2 pl-2 !py-2"
                    >
                      <div className="my-[2px]">
                        <div className="text-sm text-foreground">Documents:</div>
                        <div className="text-xs text-purple-600 dark:text-orange-400">
                          {member.docsOwned} docs
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <VeltCommentTool
                          targetElementId={`velt-comments-${member.docsOwned}+${member.id}+${index}`}
                          style={{ width: 18, height: 18 }}
                          darkMode={theme === "dark"}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Joined on */}
                  <TableCell className="!p-0 border">
                    <div
                      id={`velt-comments-${member.joinedOn}+${member.id}+${index}`}
                      className="group flex items-center justify-between gap-2 pl-2 !py-2"
                    >
                      <div className="my-[2px]">
                        <div className="text-sm text-foreground">
                          Joined At{" "}
                        </div>
                        <div className="text-xs text-yellow-600 dark:text-orange-400">
                          {member.joinedOn}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <VeltCommentTool
                          targetElementId={`velt-comments-${member.joinedOn}+${member.id}+${index}`}
                          style={{ width: 18, height: 18 }}
                          darkMode={theme === "dark"}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Workspace role */}
                  <TableCell className="!p-0 border">
                    <div
                      id={`velt-comments-${member.role}+${member.id}+${index}`}
                      className="group flex items-center justify-between gap-2 pl-2 !py-2"
                    >
                      <div className="my-[2px]">
                        <div className="text-sm text-foreground">
                          {member.role}
                        </div>
                        {member.status === "pending" ? (
                          <div className="text-xs text-red-400 dark:text-orange-400">
                            Becomes Doc Maker in 19 hrs
                          </div>
                        ) : (
                          <div className="text-xs text-green-600 dark:text-orange-400">
                            Workpace role Doc Maker
                          </div>
                        )}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <VeltCommentTool
                          targetElementId={`velt-comments-${member.role}+${member.id}+${index}`}
                          style={{ width: 18, height: 18 }}
                          darkMode={theme === "dark"}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-sm text-muted-foreground">
                {/* Footer doesn't include header-level select/Velt; only summary text here */}
                {selectedMembers.length
                  ? `${selectedMembers.length} member${
                      selectedMembers.length > 1 ? "s" : ""
                    } selected`
                  : "No members selected"}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
