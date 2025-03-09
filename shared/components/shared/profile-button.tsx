"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui";
import { FC } from "react";
import { SquareUser, LogOut } from "lucide-react";
import Link from "next/link";
import { ButtonAuth } from "./button-auth";
import { cn } from "@/lib/utils";

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ className }) => {
  const { data: session } = useSession();

  const onExit = () => {
    signOut();
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {session ? (
        <>
          <Link href="/profile">
            <Button variant="secondary" className="flex items-center gap-2">
              <SquareUser size={18} />
              Аккаунт
            </Button>
          </Link>
          <Button variant="secondary" onClick={onExit} className="flex gap-2">
            <LogOut size={18} />
            Выйти
          </Button>
        </>
      ) : (
        <ButtonAuth />
      )}
    </div>
  );
};
