import { TriangleAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  text-center">
      <main className="p-6 rounded-2xl bg-gray-100 ">
        <center>
          <TriangleAlert className="mb-4 h-16 w-16 " />
        </center>
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Work in Progress.
        </h1>
        <p className="text-gray-600">
        </p>
      </main>
    </div>
  );
}
