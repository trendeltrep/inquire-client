import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments } from '../../features/comments/commentsSlice';
import api from '../../services/api';
import { Post } from '../../types';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

const commentSchema = yup.object({
  content: yup.string().required('Comment content is required'),
});

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { comments, loading: commentsLoading, error: commentsError } = useAppSelector((state) => state.comments);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
  });

  useEffect(() => {
    if (id) {
      fetchPost();
      dispatch(fetchComments(Number(id)));
    }
  }, [id, dispatch]);

  const fetchPost = async () => {
    try {
      const response = await api.get<Post>(`/api/posts/${id}`);
      setPost(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load post');
      setLoading(false);
    }
  };

  const onSubmit = async (data: { content: string }) => {
    try {
      await api.post(`/api/posts/${id}/comments`, data);
      dispatch(fetchComments(Number(id)));
      reset();
    } catch (err) {
      console.error('Failed to add comment');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error || !post) return <div className="p-4 text-red-500">{error || 'Post not found'}</div>;

  return (
    <main className="p-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
        <Link href={`/edit/${post.id}`} className="text-blue-500 underline">Edit Post</Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Comments</h2>

        {commentsLoading && <p>Loading comments...</p>}
        {commentsError && <p className="text-red-500">{commentsError}</p>}
        
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-2 rounded shadow-sm">
              {comment.content}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Add Comment"
            fullWidth
            {...register('content')}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </section>
    </main>
  );
}
