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
import EditorPage from "../editor-x/page";

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
            text: "Lorem ipsum dolor sit amet",
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
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);


  if (loading) return (
    <HamsterLoading />
  );



  return user ? (
    <div className="flex min-h-screen">
      <NotesNavigation />
      <main className="flex-1 p-6">
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />

        <Button className="mt-4" onClick={() => console.log(editorState)}>Log</Button>
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
          <ButtonGroup className="mt-4">            <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>Register</Button>
          </ButtonGroup>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
