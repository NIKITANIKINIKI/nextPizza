"use client";

import { FC } from "react";
import { FormInput } from "../../../form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { TFormRegister, formRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui";


interface RegisterProps {
  onClose: () => void;
}

export const Register: FC<RegisterProps> = () => {
  const methods = useForm();

  const form = useForm<TFormRegister>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form className="w-full flex flex-col gap-3">
        <FormInput
          name="fullName"
          label="Полное имя"
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
        <Button disabled={form.formState.isSubmitting}>
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
