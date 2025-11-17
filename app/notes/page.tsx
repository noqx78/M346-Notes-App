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
import { Value } from "@radix-ui/react-select";

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      <p className="text-lg font-medium">Loading</p>
    </div>
  );



  return user ? (
    <div className="flex min-h-screen">
      <NotesNavigation />
      <main className="flex-1 p-6">
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />
      </main>
    </div>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Access Denied</DialogTitle>
          <DialogDescription>
            You are not logged in. No authentication detected. Please log in to access this feature.
          </DialogDescription>
          <ButtonGroup className="mt-4">
            <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>Register</Button>
          </ButtonGroup>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
