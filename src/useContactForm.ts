import { useState } from "react";

export interface FormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

export interface FormErrors {
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Project type
    if (!formData.project.trim()) {
      newErrors.project = "Please select a project type";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormData) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", project: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  const submitForm = async (
    onSubmit: () => Promise<unknown>
  ): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      await onSubmit();
      setIsSubmitted(true);
      setFormData({ name: "", email: "", project: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 3000);
      onSuccess?.();
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    clearError,
    isSubmitting,
    isSubmitted,
    validateForm,
    submitForm,
    resetForm,
  };
};
