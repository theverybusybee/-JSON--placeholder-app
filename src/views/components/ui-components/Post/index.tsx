import { useState } from 'react';
import { Checkbox } from '../Checkbox';
import styles from './index.module.scss';
import type { PostProps } from './types';
import { Button } from '../Button';
import BinIcon from 'assets/images/icons/bin-icon.svg?react';
import EditIcon from 'assets/images/icons/edit-icon.svg?react';
import HeartIcon from 'assets/images/icons/heart-icon.svg?react';
import HeartIconSolid from 'assets/images/icons/heart-icon-solid.svg?react';
import { ButtonBorderStyle, ButtonShape } from '../Button/types';
import { FeedbackList } from 'views/components/sections/FeedBackList';
import clsx from 'clsx';

export const Post: React.FC<PostProps> = ({
  user,
  username,
  title,
  content,
  onDelete,
  onEdit,
  isFavorite,
  isChecked,
  onCheck,
  onLike,
  comments,
}) => {
  const [isFeedbackOpened, setIsFeedbackOpened] = useState<boolean>(false);
  const articleClass = clsx(styles.article, {
    [styles.article_extended]: isFeedbackOpened,
  });
  const contentClass = clsx(styles.content, styles.content_bold);
  const feedbackButtonWrapperClass = clsx(styles.feedbackButtonWrapper, {
    [styles.feedbackButtonWrapper_active]: isFeedbackOpened,
  });

  return (
    <article className={articleClass}>
      <div className={styles.usernameContainer}>
        <p className={contentClass}>{user}</p>
        <p className={styles.content}>@{username}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.iconButton} onClick={onDelete}>
          <BinIcon />
        </button>
        <button className={styles.iconButton} onClick={onLike}>
          {isFavorite ? (
            <HeartIconSolid className={styles.likeButton_solid} />
          ) : (
            <HeartIcon />
          )}
        </button>
        <button className={styles.iconButton} onClick={onEdit}>
          <EditIcon />
        </button>
      </div>

      <div className={styles.postContainer}>
        <p className={contentClass}>{title}</p>
        <p className={styles.content}>{content}</p>
      </div>

      {comments.length !== 0 && (
        <div className={feedbackButtonWrapperClass}>
          <Button
            extraClass={`${styles.feedbackButton}`}
            content="show comments"
            shape={ButtonShape.RoundedSquare}
            borderStyle={ButtonBorderStyle.Gradient}
            onClick={() => {
              setIsFeedbackOpened(!isFeedbackOpened);
            }}
            hasArrow={true}
            isActive={isFeedbackOpened}
          />
        </div>
      )}

      <div className={styles.checkboxContainer}>
        <p>Highlight post:</p>
        <Checkbox isChecked={isChecked} setIsChecked={onCheck} />
      </div>
      {isFeedbackOpened && (
        <FeedbackList
          extraClass={styles.feedbackList}
          feedbackList={comments}
        />
      )}
    </article>
  );
};
