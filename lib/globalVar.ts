let currentNote = "";

export function getCurrentNote() {
  return currentNote;
}

export function setCurrentNote(note: string) {
  currentNote = note;
}
