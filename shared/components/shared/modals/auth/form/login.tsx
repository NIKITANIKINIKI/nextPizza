"use client";

import { FC } from "react";
import { Title } from "../../../title";
import { Button, DialogTitle } from "@/shared/components/ui";
import { FormInput } from "../../../form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLogin } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface LoginProps {
  onClose: () => void;
}

export const Login: FC<LoginProps> = ({ onClose }) => {
  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLogin) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      ////
      if (!res?.ok) {
        throw new Error();
      }
      onClose();

      toast.success("Вы успешно вошли");
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
          name="email"
          placeholder="Введите полное имя "
          label="Email"
        />
        <FormInput
          name="password"
          placeholder="Введите пароль "
          type="password"
          label="Password"
        />
        <Button disabled={form.formState.isSubmitting}>Вход</Button>
      </form>
    </FormProvider>
  );
};
