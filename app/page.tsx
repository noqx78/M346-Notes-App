"use client";
import { TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LogoutButton } from "@/components/userLogoutButton";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center bg-background text-foreground">
      <main className="p-6 rounded-2xl bg-card text-card-foreground shadow">
        <center>
          <TriangleAlert className="mb-4 h-16 w-16 " />
        </center>
        <h1 className="text-2xl font-semibold mb-2">Work in Progress.</h1>
        <Separator className="my-4" />
        <ThemeSwitcher />
        <Separator className="my-4" />

        <p className="mb-2">page list</p>
        <div className="flex flex-col text-muted-foreground gap-1">
          <a href="register" className="hover:underline">/register</a>
          <a href="login" className="hover:underline">/login</a>
          <Separator className="my-2" />
          {user ? (
            <h1>Welcome, {user.email}</h1>
          ) : (
            <h1>not logged in</h1>
          )}
          <LogoutButton />

        </div>
      </main>
    </div>
  );
}
