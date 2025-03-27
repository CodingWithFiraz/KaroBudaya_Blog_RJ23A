
import React from 'react';
import FormSection from './FormSection';

interface AuthorInfoSectionProps {
  author: string;
  email: string;
  onAuthorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthorInfoSection: React.FC<AuthorInfoSectionProps> = ({
  author,
  email,
  onAuthorChange,
  onEmailChange
}) => {
  return (
    <>
      <FormSection title="NAMA AUTHOR">
        <input
          type="text"
          name="author"
          value={author}
          onChange={onAuthorChange}
          placeholder="Nama penulis artikel"
          className="input-field"
        />
      </FormSection>
      
      <FormSection title="EMAIL">
        <input
          type="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email penulis"
          className="input-field"
        />
      </FormSection>
    </>
  );
};

export default AuthorInfoSection;
