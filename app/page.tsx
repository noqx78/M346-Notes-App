"use client";
import { useAuth } from "@/hooks/useAuth";
import { TextAnimate } from "@/components/ui/text-animate";
import { LightRays } from "@/components/ui/light-rays";
import { BlurFade } from "@/components/ui/blur-fade";
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { NotebookPenIcon } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div className="min-h-screen">
      <main className="p-2 md:p-0">
        {/* Titel */}
        <TextAnimate
          animation="slideLeft"
          by="character"
          once
          className="text-3xl md:text-4xl font-bold mt-12 md:mt-24 ml-2 md:ml-8"
        >
          M346 Cloud App
        </TextAnimate>

        {/* Willkommens-Karte */}
        {user && (
          <BlurFade delay={0.35} inView>
            <Card className="ml-2 md:ml-8 mt-4 max-w-xs p-4">
              <h1 className="ml-2 md:ml-4 text-sm md:text-base">Welcome, {user.email}</h1>
            </Card>
          </BlurFade>
        )}

        {/* Techstack-Überschrift */}
        <BlurFade delay={0.25} inView>
          <p className="text-xl md:text-2xl mt-8 md:mt-12 ml-2 md:ml-8 font-sans">Techstack</p>
        </BlurFade>

        {/* Techstack-Karten */}
        <div className="ml-2 md:ml-12">
          <div className="mt-4">
            <Card className="w-max p-4 flex flex-row flex-wrap gap-4 md:gap-6">
              {/* Next.js */}
              <BlurFade delay={0.35} inView>
                <div className="flex flex-col items-center justify-center w-28 h-36 md:w-32 md:h-40 space-y-2">
                  <Image
                    width={64}
                    height={64}
                    src="/nextjs.svg"
                    alt="nextjs logo"
                    className="invert w-10 h-10 md:w-12 md:h-12"
                  />
                  <p className="font-bold m-0 text-center text-xs md:text-sm">Next.js</p>
                </div>
              </BlurFade>
              {/* Firebase */}
              <BlurFade delay={0.50} inView>
                <div className="flex flex-col items-center justify-center w-28 h-36 md:w-32 md:h-40 space-y-2">
                  <Image
                    width={64}
                    height={64}
                    src="/firebase.svg"
                    alt="firebase logo"
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                  <p className="font-bold m-0 text-center text-xs md:text-sm">Firebase</p>
                </div>
              </BlurFade>
              {/* Tailwind */}
              <BlurFade delay={0.60} inView>
                <div className="flex flex-col items-center justify-center w-28 h-36 md:w-32 md:h-40 space-y-2">
                  <Image
                    width={64}
                    height={64}
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                    alt="tailwind logo"
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                  <p className="font-bold m-0 text-center text-xs md:text-sm">Tailwind</p>
                </div>
              </BlurFade>
            </Card>
          </div>

          {/* Team-Karten */}
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 mt-4">
            <Card className="p-2 md:p-4 max-w-xs">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                <BlurFade delay={0.70} inView>
                  <span className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/123118803?v=4" />
                    </Avatar>
                    <Link href="https://github.com/noqx78" className="font-bold hover:underline text-xs md:text-sm">
                      Noel
                    </Link>
                  </span>
                </BlurFade>
                <BlurFade delay={0.80} inView>
                  <span className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/188568105?v=4" />
                    </Avatar>
                    <Link href="" className="font-bold hover:underline text-xs md:text-sm">
                      Kilian
                    </Link>
                  </span>
                </BlurFade>
                <BlurFade delay={0.90} inView>
                  <span className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8 md:w-10 md:h-10">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/234014123?v=4" />
                    </Avatar>
                    <Link href="https://github.com/Specter0408" className="font-bold hover:underline text-xs md:text-sm">
                      Elias
                    </Link>
                  </span>
                </BlurFade>
              </div>
            </Card>
            <BlurFade delay={1} inView>
              <Card className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-2 md:p-4">
                <Link href="https://github.com/noqx78/M346-Notes-App" className="font-bold hover:underline transition-transform duration-200 hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon w-5 h-5 md:w-6 md:h-6">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                </Link>
              </Card>
            </BlurFade>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-2 md:gap-4 ml-2 md:ml-12">
          <BlurFade delay={1.1} inView>
            <Link href="/login" passHref>
              <Button
                variant="outline"
                className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 transition-transform duration-200 hover:scale-105 hover:bg-blue-50"
              >
                Login
              </Button>
            </Link>
          </BlurFade>
          <BlurFade delay={1.2} inView>
            <Link href="/register" passHref>
              <Button
                variant="outline"
                className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 transition-transform duration-200 hover:scale-105 hover:bg-green-50"
              >
                Register
              </Button>
            </Link>
          </BlurFade>
          <BlurFade delay={1.2} inView>
            <Link href="/notes" passHref>
              <Button
                variant="outline"
                className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 flex items-center gap-1 md:gap-2 transition-transform duration-200 hover:scale-105 hover:bg-purple-50"
              >
                <NotebookPenIcon className="w-3 h-3 md:w-4 md:h-4"/> Notes
              </Button>
            </Link>
          </BlurFade>
        </div>
      </main>
      <LightRays />
    </div>
  );
}
