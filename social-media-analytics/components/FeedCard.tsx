"use client";

import Image from "next/image";
import { FaRegMessage, FaUser } from "react-icons/fa6";
import { getPostImageUrl } from "@/lib/api";
import type { Post } from "@/lib/api";
import { useState, useEffect } from "react";
import { getPostComments } from "@/lib/api";

interface FeedPostCardProps {
  post: Post;
  userName: string;
}

export default function FeedPostCard({ post, userName }: FeedPostCardProps) {
  const [commentCount, setCommentCount] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    async function fetchCommentCount() {
      try {
        const comments = await getPostComments(post.id);
        setCommentCount(comments.length);
      } catch (error) {
        console.error(`Error fetching comments for post ${post.id}:`, error);
      }
    }

    fetchCommentCount();
  }, [post.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${
        isNew ? "border-l-4 border-green-500" : ""
      }`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={getPostImageUrl(post.id) || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          {isNew && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              New
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4">{post.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUser className="h-4 w-4 mr-1" />
            <span>{userName}</span>
          </div>
          <div className="flex items-center">
            <FaRegMessage className="h-4 w-4 mr-1" />
            <span>
              {commentCount !== null
                ? `${commentCount} comments`
                : "Loading..."}
            </span>
          </div>
        </div>

        {/* <div className="mt-4 text-xs text-gray-500">Posted {timeAgo}</div> */}
      </div>
    </div>
  );
}
