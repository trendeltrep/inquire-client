import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Post } from '@/types';
import api from '@/services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

const postSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});

interface PostFormData {
  title: string;
  content: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get<Post>(`/posts/${id}`);
      reset({
        title: response.data.title,
        content: response.data.content,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load post');
      setLoading(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      await api.put(`/posts/${id}`, data);
      router.push(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <main className="p-4 max-w-2xl mx-auto space-y-6">

      <Button variant='contained' onClick={() => router.push('/')} className="mb-4">
        Home
      </Button>

      <h1 className="text-3xl font-bold mt-4">Edit Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <TextField
            label="Title"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </div>

        <div>
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={6}
            {...register('content')}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
        </div>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </Button>
      </form>

    </main>
  );
}
