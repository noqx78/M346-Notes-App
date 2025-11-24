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
import { SaveIcon, MonitorIcon } from "lucide-react";

export const initialValue: SerializedEditorState = {
  root: {
    type: "root",
    version: 1,
    children: [
      {
        type: "paragraph",
        version: 1,
        children: [
          {
            type: "text",
            text: "Start typing your note...",
            detail: 0,
            format: 0,
            style: "",
            mode: "normal",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
  },
};

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [open, setOpen] = useState(true);
  const [SizeWarning, setSizeWarning] = useState(true);
  const [lastSaved, setlastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (screen.width < 768) {
      setSizeWarning(true);
    } else if (screen.width >= 768 && screen.width <= 1024) {
      setSizeWarning(true);
    } else {
      setSizeWarning(false);
    }
  }, []);

  const handleNoteSelect = (noteId: string) => {
    if (noteId === activeNote) return;
    setIsLoadingNote(true);
    setActiveNote(noteId || null);
  };

  useEffect(() => {
    if (!activeNote || !user) {
      setEditorState(initialValue);
      return;
    }
    let cancelled = false;
    const loadNote = async () => {
      try {
        const note = await getNoteValue(user.uid, activeNote);
        if (cancelled) return;
        if (note?.template?.text) {
          setEditorState(note.template.text as SerializedEditorState);
        } else if (note?.text && typeof note.text === 'object' && 'root' in note.text) {
          setEditorState(note.text as SerializedEditorState);
        }
        else if (note?.template && typeof note.template === 'object' && 'root' in note.template) {
          setEditorState(note.template as SerializedEditorState);
        }
        else {
          setEditorState(initialValue);
        }
      } catch (error) {
        console.error("Error loading note:", error);
        if (!cancelled) setEditorState(initialValue);
      } finally {
        if (!cancelled) setIsLoadingNote(false);
      }
    };
    loadNote();
    return () => { cancelled = true; };
  }, [activeNote, user]);

  if (loading) return <HamsterLoading />;

  return user ? (
    <div className="flex min-h-screen">
      <div className="w-64 min-w-[16rem] border-r">
        <NotesNavigation onSelect={handleNoteSelect} />
      </div>
      <main className="flex-1 flex flex-col p-6">
        {activeNote ? (
          isLoadingNote ? (
            <div className="flex items-center justify-center flex-1">
              <p className="text-muted-foreground">Loading note...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-2">
                <Button
                  onClick={() => {
                    saveNoteValue(user.uid, activeNote, editorState);
                    setlastSaved(new Date().toLocaleTimeString());
                  }}
                >
                  <SaveIcon className="mr-2 h-4 w-4" /> Save
                </Button>
                {lastSaved && <p className="ml-4">Last saved at {lastSaved}</p>}
              </div>
              <div className=" overflow-auto">
                <Editor
                  editorSerializedState={editorState}
                  onSerializedChange={setEditorState}
                />
              </div>
            </>
          )
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-muted-foreground">
              Select a note from the sidebar or create a new one to get started.
            </p>
          </div>
        )}
      </main>

      <Dialog
        open={SizeWarning}
        onOpenChange={setSizeWarning}
      >
        <DialogContent>
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <MonitorIcon className="h-12 w-12" />

            <DialogHeader className="text-center">
              <DialogTitle>Screen Size Warning</DialogTitle>
              <DialogDescription>
                Your screen size may not be optimal for this application.
              </DialogDescription>
            </DialogHeader>

            <Button onClick={() => setSizeWarning(false)}>Close</Button>
          </div>
        </DialogContent>

      </Dialog>


    </div>

  ) : (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => { if (!isOpen) setOpen(true); }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Denied</DialogTitle>
            <DialogDescription>
              You are not logged in. Please log in to access this feature.
            </DialogDescription>
            <ButtonGroup className="mt-4">
              <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
              <Button variant="outline" onClick={() => router.push("/register")}>Register</Button>
            </ButtonGroup>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
