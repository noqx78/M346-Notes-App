import { TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator"

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
        <p className="text-gray-950 ">
          <Separator className="my-4" />
          <p className="mb-2">page list</p>
      <div className="flex flex-col text-gray-600">
        <a href="register">/register</a>
        <a href="login">/login</a>
      </div>

          </p>
      </main>
    </div>
  );
}
