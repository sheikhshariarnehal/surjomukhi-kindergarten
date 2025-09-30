'use client';

import React from 'react';
import { useForm, UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local' | 'textarea' | 'select';
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

export interface FormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  fields: FormFieldProps<T>[];
  submitLabel?: string;
  loading?: boolean;
  className?: string;
  children?: (form: UseFormReturn<T>) => React.ReactNode;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  fields,
  submitLabel = 'Submit',
  loading = false,
  className,
  children,
}: FormProps<T>) {
  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  }) as UseFormReturn<T>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
  } = form;

  const handleFormSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderField = (field: FormFieldProps<T>) => {
    const error = errors[field.name]?.message as string;
    const commonProps = {
      id: field.name,
      label: field.label,
      placeholder: field.placeholder,
      helperText: field.helperText,
      error,
      disabled: field.disabled || loading,
      className: field.className,
      ...register(field.name, { required: field.required }),
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            rows={field.rows || 4}
          />
        );

      case 'select':
        return (
          <Select
            {...commonProps}
            options={field.options || []}
            value={watch(field.name)}
            onChange={(value) => setValue(field.name, value as any)}
          />
        );

      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            onChange={(e) => {
              const value = e.target.value === '' ? '' : Number(e.target.value);
              setValue(field.name, value as any);
            }}
          />
        );

      case 'date':
      case 'datetime-local':
        return (
          <Input
            {...commonProps}
            type={field.type}
          />
        );

      default:
        return (
          <Input
            {...commonProps}
            type={field.type || 'text'}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('space-y-6', className)}
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {renderField(field)}
        </div>
      ))}

      {children && children(form)}

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="submit"
          loading={isSubmitting || loading}
          disabled={isSubmitting || loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

// Utility hook for form handling
export function useFormHandler<T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
) {
  return useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  }) as UseFormReturn<T>;
}

export default Form;
