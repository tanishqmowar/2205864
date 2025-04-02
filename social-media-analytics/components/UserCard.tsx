import Image from "next/image";
import { getUserImageUrl } from "@/lib/api";
import { FaTrophy, FaRegMessage } from "react-icons/fa6";

interface UserWithPostCount {
  id: string;
  name: string;
  postCount: number;
}

interface UserCardProps {
  user: UserWithPostCount;
  rank: number;
}

export default function UserCard({ user, rank }: UserCardProps) {
  const rankColors = [
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-gray-100 text-gray-800 border-gray-300",
    "bg-amber-100 text-amber-800 border-amber-300",
    "bg-blue-50 text-blue-800 border-blue-200",
    "bg-green-50 text-green-800 border-green-200",
  ];

  const rankColor =
    rankColors[rank - 1] || "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className={`p-4 flex items-center justify-between ${rankColor} border-b`}
      >
        <div className="flex items-center">
          <FaTrophy className="h-5 w-5 mr-2" />
          <span className="font-bold">Rank #{rank}</span>
        </div>
        <div className="flex items-center">
          <FaRegMessage className="h-5 w-5 mr-1" />
          <span className="font-semibold">{user.postCount} posts</span>
        </div>
      </div>

      <div className="p-6 flex items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
          <Image
            src={getUserImageUrl(user.id) || "/placeholder.svg"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">User ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
}
