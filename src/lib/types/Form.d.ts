declare type BaseFormProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
};

declare type OptionalToNullable<T> = {
  [K in keyof T]-?: undefined extends T[K]
    ? Exclude<T[K], undefined> | null
    : T[K];
};
