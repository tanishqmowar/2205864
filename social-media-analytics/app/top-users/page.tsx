import { getUsers, getUserPosts } from "@/lib/api";
import UserCard from "@/components/UserCard";

interface UserWithPostCount {
  id: string;
  name: string;
  postCount: number;
}

export default async function TopUsersPage() {
  const users = await getUsers();

  const userPostCounts: UserWithPostCount[] = await Promise.all(
    Object.entries(users).map(async ([id, name]) => {
      const posts = await getUserPosts(id);
      return {
        id,
        name,
        postCount: posts.length,
      };
    })
  );

  const topUsers = userPostCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Top 5 Users by Post Count
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topUsers.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
