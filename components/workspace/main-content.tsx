"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CodoTable from "@/components/workspace/CodoTable";

export function MainContent() {
  const [activeTab, setActiveTab] = useState("Members");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 bg-background">
      {/* Main Content Header */}
      <div className="border-b border-border px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground">
            Workspace settings
          </h1>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-border px-4 lg:px-6">
        <div className="flex space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide">
          {["About", "Members", "Billing", "Packs", "Access", "Activity"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>
      <CodoTable />
      {/* Members Content */}
      <div className="p-4 lg:p-6">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Select defaultValue="current">
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="workspace-members">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workspace-members">
                  Workspace Members
                </SelectItem>
                <SelectItem value="admins">Admins</SelectItem>
                <SelectItem value="editors">Editors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full lg:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
