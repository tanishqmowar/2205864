const API_BASE_URL = "http://20.244.56.144/evaluation-service";

export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
}

export async function getUsers(): Promise<Record<string, string>> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts for user ${userId}: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    throw error;
  }
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch comments for post ${postId}: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
}

export function getUserImageUrl(userId: string): string {
  return `https://i.pravatar.cc/150?u=${userId}`;
}

export function getPostImageUrl(postId: string): string {
  return `https://picsum.photos/seed/${postId}/400/300`;
}
