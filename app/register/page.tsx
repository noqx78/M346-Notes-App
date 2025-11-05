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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            />

            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <main className="w-full max-w-md p-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Register an account</CardTitle>
                            <CardDescription>
                                Sign up with your email to get started.
                            </CardDescription>
                            <CardAction>
                                <Button variant="link"></Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input
                                                id="firstName"
                                                type="text"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input
                                                id="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Separator className="my--10" />
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
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="">Confirm Password</Label>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="terms" />
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Label htmlFor="terms">Accept terms and conditions</Label>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>dont exploit, dont hack and pls no ddos:(</p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                            <Separator className="my--10 mt-1 mb-1" />
                            <Link href="/login" passHref>
                                <Button asChild variant="outline" className="w-4xs flex items-center gap-2">
                                    <span className="flex items-center gap-2">
                                        <LinkIcon />
                                        Login
                                    </span>
                                </Button>
                            </Link>

                        </CardFooter>
                    </Card>
                </main>
            </div>
        </div >
    );
}
