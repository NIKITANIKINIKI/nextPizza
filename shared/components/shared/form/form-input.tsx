"use client";

import { FC } from "react";
import { Input } from "../../ui";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ErrorFormText } from "../error-form-text";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: FC<FormInputProps> = ({
  name,
  required,
  className,
  label,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      <p className="text-gray-500 mb-1 text-[16px]">{label}</p>
      <div className="flex relative">
        <Input className="h-12 text-[16px] " {...register(name)} {...props} />
        {value && <X className="absolute right-2 top-3 cursor-pointer" onClick={onClear} />}
      </div>
      {errorText && <ErrorFormText error={errorText} />}
    </div>
  );
};
