import { Control, FieldErrors, FieldPath, FieldValues } from 'react-hook-form';
import { TextInputProps } from '~components/form/TextInput';

export interface TextInputInterface extends TextInputProps {
  type: 'text-input';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FormInputProps<T extends FieldValues, F> = {
  control: Control<T, any>;
  name: FieldPath<T>;
  errors: FieldErrors<T>;
  wrapChange?: (value: T) => any;
  wrapValue?: (value: T) => any;
} & TextInputInterface;
