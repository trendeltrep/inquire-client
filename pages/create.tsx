import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';

const postSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});

interface PostFormData {
  title: string;
  content: string;
}

export default function CreatePostPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: PostFormData) => {
    try {
      await api.post('/posts', data);
      router.push('/');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <main className="p-4 max-w-2xl mx-auto space-y-6">

      <Button variant='contained' onClick={() => router.push('/')}>
        Home
      </Button>

      <h1 className="text-3xl font-bold mt-4">Create New Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Title"
          fullWidth
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Content"
          fullWidth
          multiline
          rows={6}
          {...register('content')}
          error={!!errors.content}
          helperText={errors.content?.message}
        />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </Button>
      </form>
    </main>
  );
}
