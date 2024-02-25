import styles from './index.module.scss';
import type { PostsSectionProps } from './types';
import clsx from 'clsx';
import { PostList } from '../PostList';
import { useAppSelector } from 'app/hooks';
import { selectPosts } from 'slices/postsSlice';
import { useMemo, useState } from 'react';
import { Pagination } from 'views/components/ui-components/Pagination';

export const PostsSection: React.FC<PostsSectionProps> = ({
  postsAmount,
  extraClass,
}) => {
  const posts = useAppSelector(selectPosts);
  const [currentPageState, setCurrentPageState] = useState<number>(1);

  const currentPosts = useMemo(() => {
    const startIndex = +postsAmount * (currentPageState! - 1);
    const endIndex = startIndex + +postsAmount;

    return [...posts].slice(startIndex, endIndex);
  }, [posts, posts.length, postsAmount, currentPageState]);

  const handleChangePage = (pageNumber: number) => {
    setCurrentPageState(pageNumber);
  };

  return (
    <section
      className={clsx([styles.section, extraClass])}
      aria-label="Список постов"
    >
      {currentPosts.length !== 0 && <PostList posts={currentPosts} />}
      <Pagination
        onClick={handleChangePage}
        currentPageState={currentPageState}
        pagesAmount={Math.floor(posts.length / +postsAmount)}
      />
    </section>
  );
};
