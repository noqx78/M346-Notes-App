"use client";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Button } from "./ui/button";
import { toast } from "sonner";

function logout() {
    signOut(auth)
        .then(() => {
            toast.info("You have been logged out", {
                position: "top-center",
                action: {
                    label: "Close",
                    onClick: () => console.log("toast closed"),
                },
            });
        })
        .catch((error) => {
            console.error("Error logging out user:", error);
            toast.error(`Error: ${error.message}`, {
                position: "top-center",
                action: {
                    label: "Close",
                    onClick: () => console.log("toast closed"),
                },
            });
        });
}

export function LogoutButton() {
    return <Button variant="outline" onClick={logout}>Logout</Button>;
}
