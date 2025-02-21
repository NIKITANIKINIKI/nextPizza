"use client";

import { FC } from "react";
import { Title } from "../../../title";
import { Button, Input } from "@/shared/components/ui";
import { FormInput } from "../../../form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLogin } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginProps {
  onClose: () => void;
}

export const Login: FC<LoginProps> = () => {
  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <FormProvider {...form}>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>
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
