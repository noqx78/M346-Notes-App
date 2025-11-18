"use client";
import { ThemeSwitcher } from "@/components/theme-switcher";
import NotesNavigation from "@/components/NotesNavigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
    const { user, loading } = useAuth();
    return (
        <div className="flex min-h-screen">
            <div className="w-64 min-w-[16rem] border-r">
                <NotesNavigation />
            </div>

            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>
                <div className="space-y-4">
                    <p>Email: {user?.email}</p>
                    <p>UID: {user?.uid}</p>

                    <div className="h-px bg-border my-4"></div>

                    <p>Theme</p>
                    <ThemeSwitcher />



                </div>
            </div>
        </div>
    );
}
