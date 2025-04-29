import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPosts } from '../features/posts/postsSlice';
import Link from 'next/link';

export default function Home() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <Link href="/create" className="text-blue-500 underline">Create New Post</Link>

      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <Link href={`/posts/${post.id}`} className="text-xl font-semibold">{post.title}</Link>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
