"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui";
import { Title } from "../../title";
import { FC, useState } from "react";
import { Register } from "./form/register";
import { Login } from "./form/login";
import { useSession, signIn, signOut } from "next-auth/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<"login" | "register">("login");

  const onChangeType = () => {
    setType(type === "login" ? "register" : "login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"w-[530px] p-10 border-none"}>
        <div className="w-[450px]">
          <div className="w-[400px] bg-white p-10 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="mr-2">
                <DialogTitle className="flex flex-col gap-2">
                  <Title
                    text="Вход в аккаунт"
                    size="md"
                    className="font-bold"
                  />
                  <p className="text-gray-400">
                    Введите свои данные, чтобы войти в аккаунт
                  </p>
                </DialogTitle>
              </div>
              <img
                src="/assets/images/phone-icon.png"
                alt="phone-icon"
                width={60}
                height={60}
              />
            </div>
            {type === "login" ? (
              <Login onClose={onClose} />
            ) : (
              <Register onClose={onClose} />
            )}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                type="button"
                className="h-12 p-2 flex-1 gap-2"
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "/",
                    redirect: true,
                  })
                }
              >
                <img
                  className="w-6 h-6"
                  src="https://github.githubassets.com/favicons/favicon.svg"
                />
                GitHub
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="h-12 p-2 flex-1 gap-2"
              >
                <img
                  className="w-6 h-6"
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                />
                Google
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={onChangeType}
              type="button"
              className="h-12"
            >
              {type !== "login"
                ? "Уже зарегистрирован?"
                : "Не зарегистрирован?"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
