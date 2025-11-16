"use client";

import NotesNavigation from "@/components/NotesNavigation";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <NotesNavigation />

      <main className="flex-1 p-6">
        <h1>This is content.</h1>
      </main>
    </div>
  );
}
