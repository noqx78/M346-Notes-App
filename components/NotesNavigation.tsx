"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./ui/input";

{/* 
    Todo:
    -whitemode interg
    - other
    
    */}

export default function NotesNavigation() {
  const { user } = useAuth();

  return (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] min-h-screen  text-muted-foreground">
      <h1>Notes</h1>

      <Separator className="my-4 h-px bg-border" />
      <Input type="text" placeholder="Search for Notes" />
      <Button variant="outline">
        Create new Note
      </Button>


      <div className="flex flex-col  place-items-stretch gap-1 ">
        <Button asChild variant="ghost">
          <Link href="/notes/1">Note 1</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/notes/2">Note 2</Link>
        </Button>
      </div>

      <Separator className="my-4 h-px bg-border" />
      <Button variant="outline">
        Settings
      </Button>

<Button variant="ghost">
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <p className="text-foreground text-sm">{user?.email}</p>
</Button>

    </nav>
  );
}
