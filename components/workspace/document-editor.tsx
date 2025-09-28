"use client"

import { useState } from "react"
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code, ImageIcon, Table, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CollaborationPanel } from "./collaboration-panel"

export function DocumentEditor() {
  const [content, setContent] = useState(`# Product Roadmap 2024

## Q1 Objectives

Our primary focus for Q1 will be on improving user experience and expanding our core feature set.

### Key Initiatives

1. **User Interface Redesign**
   - Modernize the dashboard layout
   - Improve mobile responsiveness
   - Implement dark mode support

2. **Performance Optimization**
   - Reduce page load times by 40%
   - Optimize database queries
   - Implement caching strategies

3. **New Features**
   - Advanced search functionality
   - Real-time collaboration tools
   - Integration with third-party services

## Success Metrics

- User satisfaction score: 4.5/5
- Page load time: < 2 seconds
- Feature adoption rate: 60%

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| UI Redesign | March 15 | In Progress |
| Performance | March 30 | Not Started |
| New Features | April 15 | Planning |

---

*Last updated: January 15, 2024*`)

  return (
    <div className="flex-1 flex">
      {/* Editor Toolbar */}
      <div className="w-12 border-r border-border bg-muted/30 flex flex-col items-center py-4 gap-2">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
        <Separator className="w-6" />
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
        <Separator className="w-6" />
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator className="w-6" />
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Table className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[600px] border-0 resize-none focus-visible:ring-0 text-base leading-relaxed font-mono"
            placeholder="Start writing..."
          />
        </div>
      </div>

      <CollaborationPanel />
    </div>
  )
}
