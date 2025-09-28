"use client"

import type React from "react"

import { useState } from "react"
import { Star, FileText, Package, Users, Settings, Folder, FolderOpen, Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarItem {
  id: string
  name: string
  type: "folder" | "doc"
  icon?: React.ReactNode
  isExpanded?: boolean
  children?: SidebarItem[]
}

const navigationItems = [
  {
    id: "shortcuts",
    name: "My shortcuts",
    icon: <Star className="h-4 w-4" />,
    type: "nav" as const,
  },
  {
    id: "templates",
    name: "Templates",
    icon: <FileText className="h-4 w-4" />,
    type: "nav" as const,
  },
  {
    id: "packs",
    name: "Packs",
    icon: <Package className="h-4 w-4" />,
    type: "nav" as const,
    badge: "NEW",
  },
  {
    id: "members",
    name: "Members",
    icon: <Users className="h-4 w-4" />,
    type: "nav" as const,
  },
  {
    id: "workspace-settings",
    name: "Workspace settings",
    icon: <Settings className="h-4 w-4" />,
    type: "nav" as const,
    isActive: true,
  },
]

const folderItems: SidebarItem[] = [
  {
    id: "my-docs",
    name: "My docs",
    type: "folder",
    icon: <Folder className="h-4 w-4" />,
    isExpanded: false,
    children: [],
  },
  {
    id: "admin-docs",
    name: "Admin Docs",
    type: "folder",
    icon: <Folder className="h-4 w-4" />,
    isExpanded: false,
    children: [],
  },
]

export function Sidebar({ className }: { className?: string }) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<string>("workspace-settings")
  const [isOpen, setIsOpen] = useState(false)

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Coda Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-muted-foreground text-sm">coda.io</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="p-2">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item.id)
                    setIsOpen(false) // Close mobile sidebar on item click
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                    selectedItem === item.id || item.isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                  )}
                >
                  {item.icon}
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Folders Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">FOLDERS</span>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-1">
                {folderItems.map((folder) => {
                  const isExpanded = expandedFolders.has(folder.id)
                  return (
                    <div key={folder.id}>
                      <button
                        onClick={() => {
                          toggleFolder(folder.id)
                          setSelectedItem(folder.id)
                          setIsOpen(false) // Close mobile sidebar on folder click
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                          selectedItem === folder.id
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                        )}
                      >
                        {isExpanded ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
                        <span className="flex-1">{folder.name}</span>
                      </button>

                      {isExpanded && folder.children && folder.children.length > 0 && (
                        <div className="ml-6 space-y-1">
                          {folder.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => {
                                setSelectedItem(child.id)
                                setIsOpen(false) // Close mobile sidebar on child click
                              }}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                                selectedItem === child.id
                                  ? "bg-accent text-accent-foreground font-medium"
                                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
                              )}
                            >
                              <FileText className="h-4 w-4" />
                              <span className="flex-1">{child.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  return (
    <>
      <div className={cn("hidden lg:flex w-64 border-r border-border bg-background flex-col", className)}>
        <SidebarContent />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
