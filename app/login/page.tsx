"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import { LinkIcon, SendHorizonalIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User, sendPasswordResetEmail } from "firebase/auth";
import { app, db, auth } from '../../lib/firebase'
import { resetPassword } from "@/lib/resetPassword";


export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [resetMail, setResetMail] = useState("");
    const router = useRouter();

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
                console.log("User logged in:", userCredential.user);
                toast.success("Successfully logged in!", {
                    position: "top-center",
                    action: {
                        label: "Close",
                        onClick: () => console.log("toast closed"),
                    },
                });
                router.push("/");
            })
            .catch(error => {
                console.error("Error logging in user:", error);
                toast.error(`Error: ${error.message}`, {
                    position: "top-center",
                    action: {
                        label: "Close",
                        onClick: () => console.log("toast closed"),
                    },
                });
            });

    }





    const [open, setOpen] = useState(false);
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"

            />

            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <main className="w-full max-w-md p-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link"></Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="example@belastend.ch"
                                            required
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Button variant="link" className="ml-auto inline-block text-sm font-normal underline-offset-4 hover:underline" onClick={() => setOpen(true)}>Forgot your password?</Button>
                                        </div>
                                        <Input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" onClick={signIn}>
                                Login
                            </Button>
                            <Separator className="my--10 mt-1 mb-1" />
                            <Link href="/register" passHref>
                                <Button asChild variant="outline" className="w-4xs flex items-center gap-2">
                                    <span className="flex items-center gap-2">
                                        <LinkIcon />
                                        Register
                                    </span>
                                </Button>
                            </Link>

                        </CardFooter>
                    </Card>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reset password</DialogTitle>
                                <DialogDescription>
                                    Enter your account email below to receive a password reset link.
                                </DialogDescription>
                                <span>
                                    <Input type="email" placeholder="Email" className="w-2xs" value={resetMail}
                                        onChange={(e) => setResetMail(e.target.value)} /> <Button
                                            onClick={() => resetPassword(resetMail)}
                                            className="ml-1 mt-3"
                                        > <SendHorizonalIcon></SendHorizonalIcon>Send</Button>
                                </span>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </main>
            </div>
        </div>
    );
}
