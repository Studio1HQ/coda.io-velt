"use client"

import { useState } from "react"
import { MessageSquare, Users, Bell, Send, Reply, ThumbsUp, AtSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const comments = [
  {
    id: "1",
    author: "Alice Smith",
    avatar: "AS",
    content:
      "Should we include mobile app metrics in Q1? I think it would be valuable to track user engagement across platforms.",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "1-1",
        author: "John Doe",
        avatar: "JD",
        content: "Good point! Let me add a section for mobile metrics.",
        timestamp: "1 hour ago",
      },
    ],
    likes: 3,
    isResolved: false,
  },
  {
    id: "2",
    author: "Mike Johnson",
    avatar: "MK",
    content: "The timeline looks aggressive. Should we add buffer time for potential delays?",
    timestamp: "1 day ago",
    replies: [],
    likes: 1,
    isResolved: true,
  },
]

const collaborators = [
  { name: "John Doe", avatar: "JD", status: "online", role: "Owner" },
  { name: "Alice Smith", avatar: "AS", status: "online", role: "Editor" },
  { name: "Mike Johnson", avatar: "MK", status: "away", role: "Editor" },
  { name: "Sarah Wilson", avatar: "SW", status: "offline", role: "Viewer" },
]

const notifications = [
  {
    id: "1",
    type: "comment",
    message: 'Alice Smith commented on "Product Roadmap 2024"',
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    type: "mention",
    message: 'Mike Johnson mentioned you in "Engineering Architecture"',
    timestamp: "1 day ago",
    isRead: false,
  },
  {
    id: "3",
    type: "share",
    message: 'Sarah Wilson shared "Q4 Budget Planning" with you',
    timestamp: "2 days ago",
    isRead: true,
  },
]

export function CollaborationPanel() {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would submit the comment
      setNewComment("")
    }
  }

  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim()) {
      // In a real app, this would submit the reply
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  return (
    <div className="w-80 border-l border-border bg-muted/30 flex flex-col">
      <Tabs defaultValue="comments" className="flex-1 flex flex-col">
        <div className="border-b border-border p-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="collaborators" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              People
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">
              <Bell className="h-3 w-3 mr-1" />
              Activity
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="comments" className="flex-1 flex flex-col m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className={`${comment.isResolved ? "opacity-60" : ""}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          {comment.isResolved && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                      {!comment.isResolved && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Resolve
                        </Button>
                      )}
                    </div>

                    {comment.replies.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-muted space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">{reply.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs text-foreground">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {replyingTo === comment.id && (
                      <div className="mt-3 pl-4 border-l-2 border-primary">
                        <div className="flex gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Write a reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[60px] text-xs resize-none"
                            />
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" className="h-6 text-xs" onClick={() => handleSubmitReply(comment.id)}>
                                Reply
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <AtSign className="h-3 w-3 mr-1" />
                    Mention
                  </Button>
                  <Button size="sm" className="h-6 text-xs" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                    <Send className="h-3 w-3 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="collaborators" className="flex-1 m-0">
          <div className="p-4">
            <div className="space-y-3">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{collaborator.avatar}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        collaborator.status === "online"
                          ? "bg-green-500"
                          : collaborator.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{collaborator.name}</p>
                    <p className="text-xs text-muted-foreground">{collaborator.role}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {collaborator.status}
                  </Badge>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Invite people
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="flex-1 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer hover:bg-accent/50 ${!notification.isRead ? "border-primary/50" : ""}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          !notification.isRead ? "bg-primary" : "bg-transparent"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
