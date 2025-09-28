"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, MoreHorizontal, Star, Share, Trash2, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const documents = [
  {
    id: "1",
    title: "Product Roadmap 2024",
    type: "roadmap",
    lastModified: "2 hours ago",
    author: "John Doe",
    collaborators: ["JD", "AS", "MK"],
    isStarred: true,
    isShared: true,
    tags: ["product", "planning"],
  },
  {
    id: "2",
    title: "User Research Findings",
    type: "document",
    lastModified: "1 day ago",
    author: "Alice Smith",
    collaborators: ["AS", "LM"],
    isStarred: false,
    isShared: true,
    tags: ["research", "users"],
  },
  {
    id: "3",
    title: "Engineering Architecture",
    type: "document",
    lastModified: "3 days ago",
    author: "Mike Johnson",
    collaborators: ["MK", "RJ", "TL"],
    isStarred: false,
    isShared: false,
    tags: ["engineering", "architecture"],
  },
  {
    id: "4",
    title: "Q4 Budget Planning",
    type: "spreadsheet",
    lastModified: "1 week ago",
    author: "Sarah Wilson",
    collaborators: ["SW", "JD"],
    isStarred: true,
    isShared: true,
    tags: ["finance", "planning"],
  },
]

interface DocumentBrowserProps {
  onSelectDocument: (documentId: string) => void
}

export function DocumentBrowser({ onSelectDocument }: DocumentBrowserProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("modified")

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">All Documents</h2>
            <p className="text-muted-foreground">{filteredDocuments.length} documents</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modified">Last Modified</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Documents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectDocument(doc.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{doc.title}</h3>
                      <p className="text-xs text-muted-foreground">{doc.lastModified}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1">
                      {doc.collaborators.slice(0, 3).map((collaborator, i) => (
                        <Avatar key={i} className="h-5 w-5 border border-background">
                          <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                        </Avatar>
                      ))}
                      {doc.collaborators.length > 3 && (
                        <div className="h-5 w-5 rounded-full bg-muted border border-background flex items-center justify-center">
                          <span className="text-xs">+{doc.collaborators.length - 3}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {doc.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                      {doc.isShared && <Share className="h-3 w-3 text-muted-foreground" />}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {doc.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => onSelectDocument(doc.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {doc.isStarred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                        <h3 className="font-medium">{doc.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-1">
                        {doc.collaborators.slice(0, 3).map((collaborator, i) => (
                          <Avatar key={i} className="h-6 w-6 border border-background">
                            <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>

                      <span className="text-sm text-muted-foreground w-20">{doc.lastModified}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
