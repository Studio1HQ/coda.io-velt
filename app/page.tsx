import { Topbar } from "@/components/workspace/topbar"
import { Sidebar } from "@/components/workspace/sidebar"
import { MainContent } from "@/components/workspace/main-content"

export default function WorkspacePage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}
