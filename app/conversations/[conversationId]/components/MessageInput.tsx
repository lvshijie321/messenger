'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputPrps {
  placeholder?: string;
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}
const MessageInput: React.FC<MessageInputPrps> = ({
  placeholder,
  id,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {
          required,
        })}
        placeholder={placeholder}
        className='
        text-black
          font-light
          py-2
          px-4
          w-full
          rounded-full
          focus:outline-none
        bg-neutral-100
        '
      />
    </div>
  );
};

export default MessageInput;
