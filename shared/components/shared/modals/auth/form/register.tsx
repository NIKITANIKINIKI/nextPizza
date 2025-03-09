"use client";

import { FC } from "react";
import { FormInput } from "../../../form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { TFormRegister, formRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DialogTitle } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";
import { signIn } from "next-auth/react";

interface RegisterProps {
  onClose: () => void;
}

export const Register: FC<RegisterProps> = ({ onClose }) => {
  const form = useForm<TFormRegister>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: TFormRegister) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);

      onClose();
      toast.success("Вы успешно зарегистрировались");
    } catch {
      toast.error("Произошла ошибка");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="fullName"
          label="Полное имя"
          placeholder="Введите полное имя "
        />
        <FormInput
          name="email"
          label="Почта"
          placeholder="Введите полное имя "
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль "
        />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          placeholder="Введите пароль еще раз "
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
