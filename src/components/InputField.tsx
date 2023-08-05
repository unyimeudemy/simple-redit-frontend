import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  InputProps,
  ComponentWithAs,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea as ComponentWithAs<"input", InputProps>;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <InputOrTextarea
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
