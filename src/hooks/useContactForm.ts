import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
}

export const useContactForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.project) {
      newErrors.project = "Project type is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof Errors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submitForm = async (submitFn: () => Promise<void>) => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitFn();
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      setErrors({ message: error instanceof Error ? error.message : "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    clearError,
    isSubmitting,
    isSubmitted,
    submitForm,
  };
};
