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


export default function Home() {
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
                                            id="email"
                                            type="email"
                                            placeholder="example@belastend.ch"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Button variant="link" className="ml-auto inline-block text-sm font-normal underline-offset-4 hover:underline" onClick={() => setOpen(true)}>Forgot your password?</Button>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Separator className="my--10 mt-1 mb-1" />
                            <Button variant={"outline"} type="submit" className="w-4xs">
                                <LinkIcon></LinkIcon><a href="register">Register</a>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* password vergessen dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reset password</DialogTitle>
                                <DialogDescription>
                                    Enter your account email below to receive a password reset link.
                                </DialogDescription>
                                <span>
                                <Input type="email" placeholder="Email" className="w-2xs" /> <Button className="ml-1 mt-3"> <SendHorizonalIcon></SendHorizonalIcon>Send</Button>
                                </span>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </main>
            </div>
        </div>
    );
}
