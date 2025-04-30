import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllPosts, fetchPosts } from '@/features/posts/postsSlice';
import { Button, TextField } from '@mui/material';
import PostListItem from '@/components/PostListItem';
import PaginationControls from '@/components/PaginationControls';

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 5;
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.length > 0) {
      dispatch(fetchAllPosts());
    } else {
      dispatch(fetchPosts({ page, limit: POSTS_PER_PAGE }));
    }
  }, [dispatch, page, search]);

  const handleNext = () => {
    if (filteredPosts.length === POSTS_PER_PAGE) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <a href="/create" className="text-blue-500 underline">
          Create New Post
        </a>

        <TextField
          label="Search by title"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          className="w-full md:w-1/3"
        />
      </div>

      <ul className="mt-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostListItem key={post.id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </ul>

      {search.length === 0 && (
        <PaginationControls
          onNext={handleNext}
          onPrev={handlePrev}
          page={page}
          hasNextPage={filteredPosts.length === POSTS_PER_PAGE}
        />
      )}
    </main>
  );
}
