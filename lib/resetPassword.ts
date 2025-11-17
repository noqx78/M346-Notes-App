import { toast } from "sonner";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function resetPassword(email: string) {
    if (email.includes("@") && email.includes(".")) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Reset link has been sent", {
                    position: "top-center",
                    action: {
                        label: "Close",
                        onClick: () => console.log("toast closed"),
                    },
                });
            })
            .catch(error => {
                toast.error(`Error: ${error.message}`, {
                    position: "top-center",
                    action: {
                        label: "Close",
                        onClick: () => console.log("toast closed"),
                    },
                });
            });
    }
}
