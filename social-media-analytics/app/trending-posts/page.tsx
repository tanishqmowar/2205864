import { getUsers, getUserPosts, getPostComments } from "@/lib/api";
import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/api";

interface PostWithCommentCount extends Post {
  commentCount: number;
  userName: string;
}

export default async function TrendingPostsPage() {
  const users = await getUsers();

  const allPosts: Post[] = [];
  for (const [userId] of Object.entries(users)) {
    const userPosts = await getUserPosts(userId);
    allPosts.push(...userPosts);
  }

  const postsWithCommentCounts: PostWithCommentCount[] = await Promise.all(
    allPosts.map(async (post) => {
      const comments = await getPostComments(post.id);
      return {
        ...post,
        commentCount: comments.length,
        userName: users[post.userId] || "Unknown User",
      };
    })
  );

  const maxCommentCount = Math.max(
    ...postsWithCommentCounts.map((post) => post.commentCount)
  );

  const trendingPosts = postsWithCommentCounts.filter(
    (post) => post.commentCount === maxCommentCount
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Trending Posts</h1>
      <p className="text-gray-600 text-center mb-8">
        Posts with the highest comment count ({maxCommentCount} comments)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {trendingPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            userName={post.userName}
            commentCount={post.commentCount}
          />
        ))}
      </div>
    </div>
  );
}
