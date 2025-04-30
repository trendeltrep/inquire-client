import { TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface PostFormData {
  title: string;
  content: string;
}

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
});

interface Props {
  initialValues?: PostFormData;
  onSubmit: SubmitHandler<PostFormData>;
  submitting?: boolean;
}

export default function PostForm({ initialValues, onSubmit, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      <Button type="submit" variant="contained" disabled={submitting}>
        {submitting ? 'Saving...' : 'Submit'}
      </Button>
    </form>
  );
}
