"use client";
import {
  useVeltClient,
  VeltCommentsSidebar,
  VeltNotificationsTool,
  VeltPresence,
  VeltSidebarButton,
} from "@veltdev/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { names, userIds, useUserStore } from "@/helper/userdb";
import { ChevronDown, User } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useTheme, { ThemeToggleButton } from "../hooks/use-theme";
export function Topbar() {
  const { user, setUser } = useUserStore();
  const { client } = useVeltClient();
  const prevUserRef = useRef(user);
  const isInitializingRef = useRef(false); // Prevent overlapping initialization calls

  const predefinedUsers = useMemo(
    () =>
      userIds.map((uid, index) => {
        const avatarUrls = [
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany",
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary",
        ];
        return {
          uid: uid,
          displayName: names[index],
          email: `${names[index].toLowerCase()}@gmail.com`,
          photoUrl: avatarUrls[index],
        };
      }),
    []
  );

  // Initialize user from localStorage if none exists
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const storedUser = localStorage.getItem("user-storage");
      if (!storedUser) {
        setUser(predefinedUsers[0]);
      }
    }
  }, [user, setUser, predefinedUsers]);

  // Handle Velt client initialization, user identification, and document setting
  useEffect(() => {
    if (!client || !user || isInitializingRef.current) {
      console.log("Velt init skipped:", {
        client: !!client,
        user: !!user,
        initializing: isInitializingRef.current,
      });
      return;
    }

    const initializeVelt = async () => {
      isInitializingRef.current = true;
      try {
        // Detect user switch
        const isUserSwitch = prevUserRef.current?.uid !== user.uid;
        prevUserRef.current = user;

        console.log("Starting Velt init for user:", user.uid, { isUserSwitch });

        // Re-identify the user (handles initial and switches)
        const veltUser = {
          userId: user.uid,
          organizationId: "organization_id",
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        };
        await client.identify(veltUser);
        console.log("Velt user identified:", veltUser.userId);
        await client.setDocuments([
          {
            id: "airtable-inventory",
            metadata: { documentName: "airtable-inventory" },
          },
        ]);
        console.log("Velt documents set: airtable-inventory");
      } catch (error) {
        console.error("Error initializing Velt:", error);
      } finally {
        isInitializingRef.current = false;
      }
    };

    initializeVelt();
  }, [client, user]); // Re-run on client or user change
  const { theme } = useTheme();
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Product
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Resources
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Gallery
        </Button>

        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          Pricing
        </Button>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <VeltCommentsSidebar darkMode={theme === "dark"} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 h-8 bg-white  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200  dark:border dark:border-white/30 dark:!bg-[#121212] dark:hover:!bg-gray-700"
            >
              <Avatar className="w-5 h-5">
                <AvatarImage
                  src={user?.photoUrl || "https://via.placeholder.com/100"}
                  alt={user?.displayName || "User"}
                />
                <AvatarFallback className="text-xs">
                  {user?.displayName}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm truncate max-w-[100px]">
                {user?.displayName}
              </span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 bg-white  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200  dark:bg-[#121212] dark:border dark:border-white/30"
          >
            <DropdownMenuLabel>Select User</DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-white/40" />
            {predefinedUsers.map((Currentuser) => (
              <DropdownMenuItem
                key={Currentuser.uid}
                onClick={() => setUser(Currentuser)}
                className="flex items-center space-x-3 p-3 cursor-pointer hover:!bg-gray-100 hover:dark:!bg-[#121212] dark:hover:!bg-gray-700"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={Currentuser.photoUrl}
                    alt={Currentuser.displayName}
                  />
                  <AvatarFallback className="text-xs">
                    {Currentuser.displayName}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white/70">
                    {Currentuser.displayName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/60">
                    {Currentuser.email}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-white/50">
                    User
                  </div>
                </div>
                {user?.uid === Currentuser.uid && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center space-x-2 text-blue-600 hover:dark:bg-[#515881] ">
              <User size={16} />
              <span className="hover:dark:text-white/70">Manage Users</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <VeltPresence />
        <VeltNotificationsTool darkMode={theme === "dark"} />
        <VeltSidebarButton darkMode={theme === "dark"} />
        <ThemeToggleButton />
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.photoUrl} alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
