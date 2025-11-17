"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./ui/input";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { createNote } from "@/lib/createNote";

{/* 
    Todo:
    -whitemode interg
    - other
    
    */}

export default function NotesNavigation() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] min-h-screen  text-muted-foreground">
      <h1>Notes</h1>

      <Separator className="my-4 h-px bg-border" />
      <Input type="text" placeholder="Search for Notes" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create New Note</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Note</DialogTitle>
            <DialogDescription>
              Create a new note below.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const title = new FormData(e.currentTarget).get("title");
              console.log("create:", title);
              createNote(user!.uid, title as string);

              setOpen(false);
            }}
            className="space-y-4"
          >
            <Input
              name="title"
              type="text"
              placeholder="Note Title"
              required
            />

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>



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


      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent ">
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
            </Avatar>
            <p className="text-foreground text-sm">{user?.email}</p>
          </Button>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onSelect={() => signOut(auth)}>Logout</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>


    </nav >
  );
}
