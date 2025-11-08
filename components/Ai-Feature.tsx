"use client";
// need to add user messages to save also and markdown support
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SendHorizonalIcon } from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FlipHorizontalIcon } from "lucide-react";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY });

async function askGenAi(input: string,
    setOutput: React.Dispatch<React.SetStateAction<string>>,
    setThinking: React.Dispatch<React.SetStateAction<boolean>>,
    messages: string[],
    setMessages: React.Dispatch<React.SetStateAction<string[]>>) {

    setThinking(true)
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input + ""
    });
    const text: string = response.text ?? "";
    setOutput(text);
    setMessages(prev => [...prev, text]);
    setThinking(false)
}

function GeminiFunction() {
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [thinking, setThinking] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);

    return (
        <div>
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>AI</CardTitle>
                    <CardDescription>staging/ai-feature</CardDescription>
                    <CardAction ><svg className="invert w-24 h-24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                    </svg></CardAction>
                </CardHeader>
                <CardContent>
                    <span>
                        <Input type="text" placeholder="Ask smth" className="max-w-xs" value={input} onChange={(e) => setInput(e.target.value)} />
                        <Button onClick={() => askGenAi(input, setOutput, setThinking, messages, setMessages,)}>
                            <SendHorizonalIcon />
                        </Button>
                        <div className="mt-4 space-y-2">
                            {messages.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                        </div>
                        {thinking == true && (
                            <span>
                                <Skeleton className="h-4 rounded-xs mt-4 w-[200px]" />
                                <Skeleton className="h-4 rounded-xs mt-2 w-[150px]" />
                            </span>
                        )}

                    </span>
                </CardContent>
            </Card>
        </div>
    );
}

export default GeminiFunction;

