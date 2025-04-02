"use client";

import { useState, useEffect } from "react";
import { getUsers, getUserPosts, type Post } from "@/lib/api";
import FeedPostCard from "@/components/FeedCard";

interface PostWithUserName extends Post {
  userName: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<PostWithUserName[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchInitialData() {
      try {
        setLoading(true);

        const usersData = await getUsers();
        setUsers(usersData);

        const allPosts: PostWithUserName[] = [];
        for (const [userId, userName] of Object.entries(usersData)) {
          const userPosts = await getUserPosts(userId);
          const postsWithUserName = userPosts.map((post) => ({
            ...post,
            userName,
          }));
          allPosts.push(...postsWithUserName);
        }

        const sortedPosts = allPosts.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const allNewPosts: PostWithUserName[] = [];

        for (const [userId, userName] of Object.entries(users)) {
          const userPosts = await getUserPosts(userId);
          const postsWithUserName = userPosts.map((post) => ({
            ...post,
            userName,
          }));
          allNewPosts.push(...postsWithUserName);
        }

        const existingPostIds = new Set(posts.map((post) => post.id));
        const newPosts = allNewPosts.filter(
          (post) => !existingPostIds.has(post.id)
        );

        if (newPosts.length > 0) {
          setPosts((prevPosts) => {
            const updatedPosts = [...newPosts, ...prevPosts];
            return updatedPosts.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            );
          });
        }
      } catch (error) {
        console.error("Error polling for new posts:", error);
      }
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [posts, users]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <p className="mt-4 text-gray-600">Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Live Feed</h1>
      <p className="text-gray-600 text-center mb-8">
        See the latest posts in real-time
      </p>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} userName={post.userName} />
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No posts available</p>
          </div>
        )}
      </div>
    </div>
  );
}
