import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../features/posts/postsSlice';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';

const POSTS_PER_PAGE = 5;

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchPosts({ page, limit: POSTS_PER_PAGE }));
  }, [dispatch, page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
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
        <Link href="/create" className="text-blue-500 underline">
          Create New Post
        </Link>

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
          filteredPosts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow">
              <Link href={`/posts/${post.id}`} className="text-xl font-semibold">{post.title}</Link>
              <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
            </li>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </ul>

      <div className="flex gap-4 justify-center mt-8">
        <Button variant="outlined" onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
    </main>
  );
}
