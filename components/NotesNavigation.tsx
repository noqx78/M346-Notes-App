"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/context-menu";
import { useState, useEffect } from "react";
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
import { PencilIcon, Trash2Icon, SettingsIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { setCurrentNote } from "@/lib/globalVar";
import { useRouter } from "next/navigation";

export default function NotesNavigation() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [noteNames, setNoteNames] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getNotes(user.uid).then(setNoteNames);
    }
  }, [user]);

  const router = useRouter();

  return (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] min-h-screen text-muted-foreground">
      <h1 className="text-lg font-bold">Notes</h1>
      <Separator className="my-4 h-px bg-border" />
      <Input type="text" placeholder="Search for Notes" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Create New Note
          </Button>
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

      {/* Notes List */}
      <div className="flex flex-col gap-1">
        {noteNames.map((noteName) => (
          <ButtonGroup key={noteName} className="w-full">

            <Button
              variant="outline"
              className="flex-1 justify-start"
              onClick={() => { setCurrentNote(noteName); router.replace("/notes"); }}
            >
              {noteName}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-10 p-0 flex-none">
                  <Trash2Icon className="w-4 h-4" />
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
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </ButtonGroup>
        ))}
      </div>

      <Separator className="my-4 h-px bg-border" />

      <Link href="/settings" passHref className="w-full">
        <Button variant="outline" className="w-full justify-start gap-2">
          <SettingsIcon className="w-4 h-4" />
          Settings
        </Button>
      </Link>

      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent w-full justify-start gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="text-foreground">
                {user?.email?.[0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-foreground text-sm truncate">{user?.email}</p>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => signOut(auth)}>Logout</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </nav>
  );
}
