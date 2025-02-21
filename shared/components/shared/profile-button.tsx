"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui";
import { FC } from "react";
import { SquareUser } from "lucide-react";
import Link from "next/link";
import { ButtonAuth } from "./button-auth";

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton: FC<ProfileButtonProps> = ({ className }) => {
  const { data: session } = useSession();


  return (
    <div className={className}>
      {session ? (
        <ButtonAuth />
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <SquareUser size={18} />
            Аккаунт
          </Button>
        </Link>
      )}
    </div>
  );
};
