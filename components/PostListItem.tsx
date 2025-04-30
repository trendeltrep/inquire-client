import Link from 'next/link';
import { Post } from '@/types';

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/posts/${post.id}`} className="text-xl font-semibold">
      <li className="border m-4 p-1 rounded shadow">
        {post.title}
        <p className="text-gray-400">{post.content.slice(0, 100)}</p>
      </li>
    </Link>
  );
}
