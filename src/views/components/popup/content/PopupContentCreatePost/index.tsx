import type { FormState, PopupContentCreatePostProp } from './types';
import styles from './index.module.scss';
import { Button } from 'views/components/ui-components/Button';
import { useState } from 'react';

export const PopupContentCreatePost: React.FC<
  PopupContentCreatePostProp
> = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    content: '',
  });

  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormState({
      ...formState,
      title: target.value,
    });
  };

  const handleTextareaChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setFormState({
      ...formState,
      content: target.value,
    });
  };

  console.log(formState);

  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <h3 className={styles.inputTitle}>Title</h3>
        <label className={styles.label} htmlFor="">
          <input
            className={styles.input}
            type="text"
            placeholder="Type post title"
            value={formState.title}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className={styles.inputContainer}>
        <h3 className={styles.inputTitle}>Content</h3>
        <label className={styles.label} htmlFor="">
          <textarea
            className={styles.textarea}
            placeholder="Type post content"
            value={formState.content}
            onChange={handleTextareaChange}
          />
        </label>
      </div>
      <Button
        isDisabled={!formState.title && !formState.content}
        extraClass={styles.submitButton}
        type="submit"
        content="Submit"
      />
    </form>
  );
};