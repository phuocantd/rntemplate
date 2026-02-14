import React from 'react';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Controller, type Control } from 'react-hook-form';
import Radio, { type InputOption, type RadioProps } from './Radio';
import Select, { type SelectProps } from './Select';
import TextInput, { type TextInputProps } from './TextInput';

type ErrorLike = {
  message?: string;
};

type BaseFormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | ErrorLike | null;
};

type TextFormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = BaseFormInputProps<TFieldValues, TName> & {
  type: 'text';
  inputProps?: Omit<
    TextInputProps,
    | 'value'
    | 'onChangeText'
    | 'error'
    | 'label'
    | 'required'
    | 'editable'
  >;
};

type RadioFormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TValue extends string | number = string,
> = BaseFormInputProps<TFieldValues, TName> & {
  type: 'radio';
  options: InputOption<TValue>[];
  inputProps?: Omit<
    RadioProps<TValue>,
    'value' | 'onChange' | 'error' | 'label' | 'required' | 'disabled' | 'options'
  >;
};

type SelectFormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TValue extends string | number = string,
> = BaseFormInputProps<TFieldValues, TName> & {
  type: 'select';
  options: InputOption<TValue>[];
  inputProps?: Omit<
    SelectProps<TValue>,
    'value' | 'onChange' | 'error' | 'label' | 'required' | 'disabled' | 'options'
  >;
};

export type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> =
  | TextFormInputProps<TFieldValues, TName>
  | RadioFormInputProps<TFieldValues, TName>
  | SelectFormInputProps<TFieldValues, TName>;

function getErrorMessage(error?: string | ErrorLike | null): string | undefined {
  if (!error) {
    return undefined;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error.message === 'string') {
    return error.message;
  }

  return undefined;
}

export function FormInput<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  const { name, control, rules, error, label, required = false, disabled = false } =
    props;

  const errorMessage = getErrorMessage(error);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => {
        if (props.type === 'text') {
          return (
            <TextInput
              label={label}
              required={required}
              error={errorMessage}
              editable={!disabled}
              value={typeof value === 'string' ? value : String(value ?? '')}
              onBlur={onBlur}
              onChangeText={onChange}
              {...props.inputProps}
            />
          );
        }

        if (props.type === 'radio') {
          return (
            <Radio
              label={label}
              required={required}
              error={errorMessage}
              disabled={disabled}
              options={props.options}
              value={value}
              onChange={onChange}
              {...props.inputProps}
            />
          );
        }

        return (
          <Select
            label={label}
            required={required}
            error={errorMessage}
            disabled={disabled}
            options={props.options}
            value={value}
            onChange={onChange}
            {...props.inputProps}
          />
        );
      }}
    />
  );
}

export default FormInput;
