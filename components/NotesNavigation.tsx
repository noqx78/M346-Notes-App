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
import { getNotes } from "@/lib/getNotes";
import { deleteNote } from "@/lib/deleteNote";
import { useEffect } from "react";
import { ButtonGroup } from "@/components/ui/button-group"
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Label } from "recharts";

{/* 
    Todo:
    -whitemode interg
    - other
    
    */}

export default function NotesNavigation() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [noteNames, setNoteNames] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getNotes(user.uid).then(setNoteNames);
    }
  }, [user]);




  return (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] min-h-screen  text-muted-foreground">
      <Label className="text-lg font-bold">Notes</Label>

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


      <Separator className="my-1 h-px bg-border" />

      <div className="flex flex-col gap-1">
        {noteNames.map((noteName) => (
          <div key={noteName} className="flex w-full gap-1">
            <Button
              asChild
              variant="outline"
              className="flex-1 justify-start"
            >
              <Link href={`/notes/${noteName}`}>{noteName}</Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-10 p-0 flex-none">
                  <PencilIcon />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Note</DialogTitle>
                  <DialogDescription>
                    Rename note: {noteName} <br />
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button variant="outline" onClick={() => { }}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>



            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-10 p-0 flex-none">
                  <Trash2Icon />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Note?</DialogTitle>
                  <DialogDescription>
                    Note: {noteName} <br />
                    This action cannot be undone. The note will be permanently deleted.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteNote(user!.uid, noteName);
                      setOpen(false);
                      window.location.reload();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        ))}
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
              <AvatarFallback className="text-foreground">{user?.email?.[0]}</AvatarFallback>
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
