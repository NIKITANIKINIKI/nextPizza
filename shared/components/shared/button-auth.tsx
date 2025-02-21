
import { FC, useState } from "react";
import { Button } from "../ui";
import { User } from "lucide-react";
import { AuthModal } from "./modals/auth/auth-modal";

export const ButtonAuth: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-1"
        onClick={onOpen}
      >
        <User size={16} />
        Войти
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
