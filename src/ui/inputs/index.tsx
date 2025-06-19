import { yupResolver } from "@hookform/resolvers/yup";
import type { FC } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export const Form2Provider: FC<any> = ({
  onSubmit,
  children,
  schema,
  init,
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: init,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

interface ErrorInputProps {
  name: string;
}

export const ErrorInput: FC<ErrorInputProps> = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;
  return error ? (
    <span style={{ fontSize: "10px", color: "red" }}>{error}</span>
  ) : null;
};

interface InputNumberProps {
  name: string;
  step?: string | number;
  placeholder?: string;
}
export const InputNumber: FC<InputNumberProps> = ({
  name,
  step = "any",
  placeholder,
}) => {
  const { register } = useFormContext();
  return (
    <>
      <input
        type="text"
        step={step}
        placeholder={placeholder}
        {...register(name)}
      />
      <ErrorInput name={name} />
    </>
  );
};

interface InputDateProps {
  name: string;
  placeholder?: string;
}

export const InputDate: FC<InputDateProps> = ({ name, placeholder }) => {
  const { register } = useFormContext();
  return (
    <>
      <input type="date" placeholder={placeholder} {...register(name)} />
      <ErrorInput name={name} />
    </>
  );
};

interface InputOptionsProps {
  name: string;
  options: string[];
}

export const InputOptions: FC<InputOptionsProps> = ({ name, options }) => {
  const { register } = useFormContext();
  return (
    <>
      <select {...register(name)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorInput name={name} />
    </>
  );
};
