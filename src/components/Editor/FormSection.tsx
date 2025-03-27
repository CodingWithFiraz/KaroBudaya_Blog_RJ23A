
import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-karo-black font-medium mb-1">
        {title}
      </label>
      {children}
    </div>
  );
};

export default FormSection;
