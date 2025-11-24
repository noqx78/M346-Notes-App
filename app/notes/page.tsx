"use client";

import NotesNavigation from "@/components/NotesNavigation";
import { useState, useEffect } from "react";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-x/editor";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import HamsterLoading from "@/components/HamsterLoading";
import { getNoteValue } from "@/lib/getNote";
import { saveNoteValue } from "@/lib/saveNote";

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Start typing your note...",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;


export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [editorState, setEditorState] = useState<SerializedEditorState | undefined>(undefined);
  const [activeNote, setActiveNote] = useState<string>("");
  const [isLoadingNote, setIsLoadingNote] = useState(false);

  const handleNoteSelect = (noteId: string) => {
    if (noteId === activeNote) return;

    if (noteId === "") {
      setActiveNote("");
      setEditorState(undefined);
      return;
    }

    setActiveNote(noteId);
  };

  useEffect(() => {
    if (!activeNote || !user) {
      setEditorState(undefined);
      return;
    }



    let cancelled = false;
    setIsLoadingNote(true);

    async function loadNote() {
      try {
        const note = await getNoteValue(user!.uid, activeNote);
        if (cancelled) return;

        if (note?.template) {
          setEditorState(note.template ?? initialValue);
        } else {
          setEditorState(JSON.parse(JSON.stringify(initialValue)));
        }
      } catch (error) {
        console.error("Error loading note:", error);
        if (!cancelled) {
          setEditorState(JSON.parse(JSON.stringify(initialValue)));
        }
      } finally {
        if (!cancelled) {
          setIsLoadingNote(false);
        }
      }
    }

    loadNote();

    return () => {
      cancelled = true;
    };
  }, [activeNote, user]);

  if (loading) return <HamsterLoading />;

  return user ? (
    <div className="flex min-h-screen">
      <div className="w-64 min-w-[16rem] border-r">
        <NotesNavigation
          onSelect={handleNoteSelect}
        />
      </div>
      <main className="flex-1 p-6">
        {activeNote ? (
          isLoadingNote ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading note...</p>
            </div>
          ) : (
            <>
              <Editor
                key={activeNote}
                editorSerializedState={editorState}
                onSerializedChange={setEditorState}
              />

              <Button
                onClick={() => editorState && saveNoteValue(user.uid, activeNote, editorState)}>
                Save Note
              </Button>
            </>
          )
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              Select a note from the sidebar or create a new one to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  ) : (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(true);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Denied</DialogTitle>
          <DialogDescription>
            You are not logged in. No authentication detected. Please log in to access this feature.
          </DialogDescription>
          <ButtonGroup className="mt-4">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Register
            </Button>
          </ButtonGroup>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}