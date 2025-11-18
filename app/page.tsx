"use client";
import { useAuth } from "@/hooks/useAuth";
import { TextAnimate } from "@/components/ui/text-animate";
import { LightRays } from "@/components/ui/light-rays";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { NotebookPenIcon } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  const contributors = [
    { name: "Noel", src: "https://avatars.githubusercontent.com/u/123118803?v=4", link: "https://github.com/noqx78" },
    { name: "Kilian", src: "https://avatars.githubusercontent.com/u/188568105?v=4", link: "" },
    { name: "Elias", src: "https://avatars.githubusercontent.com/u/234014123?v=4", link: "https://github.com/Specter0408" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
        <TextAnimate
          animation="slideLeft"
          by="character"
          once
          className="text-3xl md:text-4xl font-bold"
        >
          M346 Cloud App
        </TextAnimate>

        {user && (
          <BlurFade delay={0.35} inView>
            <Card className="max-w-xs p-4">
              <h1 className="text-sm md:text-base">Welcome, {user.email}</h1>
            </Card>
          </BlurFade>
        )}

        <BlurFade delay={0.5} inView>
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">contributors</h2>
            <div className="flex flex-col gap-3">
              {contributors.map((member, index) => (
                <BlurFade key={member.name} delay={0.6 + index * 0.1} inView>
                  <Link href={member.link} target="_blank" className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={member.src} />
                    </Avatar>
                    <span className="font-medium hover:underline text-sm">
                      {member.name}
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </Card>
        </BlurFade>


        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { href: "/login", text: "Login", },
            { href: "/register", text: "Register", },
            { href: "/notes", text: "Notes", icon: <NotebookPenIcon className="w-4 h-4" />, },
          ].map((button, index) => (
            <BlurFade key={button.text} delay={1.0 + index * 0.1} inView>
              <Link href={button.href} passHref>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto justify-center gap-2 transition-transform hover:scale-105 `}
                >
                  {button.icon} {button.text}
                </Button>
              </Link>
            </BlurFade>
          ))}
        </div>
      </main>
      <LightRays />
    </div>
  );
}
