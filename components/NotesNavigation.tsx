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
import { Trash2Icon, SettingsIcon, MenuIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { useRouter, usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NotesNavigation({
  onSelect,
}: {
  onSelect: (noteId: string) => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [noteNames, setNoteNames] = useState<string[]>([]);
  const [currentNoteName, setCurrentNoteName] = useState<string | null>(null);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (user) {
      getNotes(user.uid).then(setNoteNames);
    }
  }, [user]);

  const NavigationContent = (
    <nav className="flex flex-col p-6 gap-4 w-64 min-w-[16rem] text-muted-foreground">
      <h1 className="text-lg font-bold">Notes{currentNoteName ? ` / ${currentNoteName}` : ""}</h1>

      <Separator className="my-4 h-px bg-border" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Create New Note
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Note</DialogTitle>
            <DialogDescription>Create a new note below.</DialogDescription>
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
            <Input name="title" placeholder="Note Title" required />

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Separator className="my-1 h-px bg-border" />

      <div className="flex flex-col gap-1">
        {noteNames.map((noteName) => (
          <ButtonGroup key={noteName} className="w-full">
            <Button
              variant="outline"
              className="flex-1 justify-start"
              onClick={() => {
                if (pathName !== "/notes") {
                  router.push("/notes");
                }
                onSelect(noteName);
                setCurrentNoteName(noteName);
              }}
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
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => deleteNote(user!.uid, noteName)}
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
          <Button className="bg-transparent hover:bg-transparent w-full justify-start gap-2 hover:!cursor-default">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
            </Avatar>

            <p className="text-foreground text-sm truncate">{user?.email}</p>
          </Button>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onSelect={() => signOut(auth)}>
            Logout
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </nav>
  );

  return (
    <>
      <div className="hidden md:block min-h-screen border-r">
        {NavigationContent}
      </div>

      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <MenuIcon className="w-5 h-5" />
              Notes Menu
            </Button>
          </SheetTrigger>

          <SheetContent side="top" className="p-0">
            {NavigationContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
