"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
{/* 
    Todo:
    -whitemode interg
    - other
    
    */}

export default function NotesNavigation() {
  const { user } = useAuth();

  return (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] min-h-screen  text-muted-foreground">
      <div className="flex flex-col items-center gap-2 ">
        <Avatar>
          <AvatarImage src="" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <p className="text-white text-sm">{user?.email}</p>
      </div>

      <Separator className="my-4 h-px bg-border" />

      <Button asChild variant="ghost">
        <Link href="/notes/1">Button 1</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/notes/2">Button 2</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/notes/3">Button 3</Link>
      </Button>

    </nav>
  );
}
