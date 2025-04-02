import Image from "next/image";
import { FaRegMessage, FaUser } from "react-icons/fa6";
import { getPostImageUrl } from "@/lib/api";
import type { Post } from "@/lib/api";

interface PostCardProps {
  post: Post;
  userName: string;
  commentCount: number;
}

export default function PostCard({
  post,
  userName,
  commentCount,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={getPostImageUrl(post.id) || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUser className="h-4 w-4 mr-1" />
            <span>{userName}</span>
          </div>
          <div className="flex items-center">
            <FaRegMessage className="h-4 w-4 mr-1" />
            <span className="font-medium text-blue-600">
              {commentCount} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
