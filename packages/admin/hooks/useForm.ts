import { useCallback, useState, FormEvent } from 'react';

export const useForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>) =>
    async (event: FormEvent<HTMLFormElement>) => {      
      event.preventDefault();
      
      setIsSubmitting(true);
      await onSubmit(event);
      setIsSubmitting(false);
  }, []);

  return {
    isSubmitting,
    handleSubmit,
  };
};