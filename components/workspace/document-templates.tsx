"use client"

import { FileText, Table, Presentation, Calculator, Calendar, Users, Target, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const templates = [
  {
    id: "blank",
    name: "Blank Document",
    description: "Start with a clean slate",
    icon: FileText,
    category: "Basic",
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Capture meeting discussions and action items",
    icon: Users,
    category: "Meetings",
  },
  {
    id: "project-plan",
    name: "Project Plan",
    description: "Plan and track project milestones",
    icon: Target,
    category: "Planning",
  },
  {
    id: "brainstorm",
    name: "Brainstorming",
    description: "Collect and organize ideas",
    icon: Lightbulb,
    category: "Creative",
  },
  {
    id: "roadmap",
    name: "Product Roadmap",
    description: "Plan product features and timeline",
    icon: Calendar,
    category: "Planning",
  },
  {
    id: "presentation",
    name: "Presentation",
    description: "Create slide-based presentations",
    icon: Presentation,
    category: "Presentation",
  },
  {
    id: "spreadsheet",
    name: "Data Table",
    description: "Organize data in rows and columns",
    icon: Table,
    category: "Data",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Build formulas and calculations",
    icon: Calculator,
    category: "Data",
  },
]

interface DocumentTemplatesProps {
  onSelectTemplate: (templateId: string) => void
}

export function DocumentTemplates({ onSelectTemplate }: DocumentTemplatesProps) {
  const categories = Array.from(new Set(templates.map((t) => t.category)))

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Create New Document</h2>
          <p className="text-muted-foreground">Choose a template to get started quickly</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates
                .filter((template) => template.category === category)
                .map((template) => {
                  const Icon = template.icon
                  return (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:shadow-md transition-all hover:scale-105"
                      onClick={() => onSelectTemplate(template.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
