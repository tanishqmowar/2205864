"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { MdDynamicFeed } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-600 hover:text-gray-900";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                API Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 ${isActive("/")}`}
            >
              <FaHome className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>
            <Link
              href="/top-users"
              className={`flex items-center px-3 py-2 ${isActive(
                "/top-users"
              )}`}
            >
              <FaUser className="h-5 w-5 mr-1" />
              <span>Top Users</span>
            </Link>
            <Link
              href="/trending-posts"
              className={`flex items-center px-3 py-2 ${isActive(
                "/trending-posts"
              )}`}
            >
              <IoMdTrendingUp className="h-5 w-5 mr-1" />
              <span>Trending</span>
            </Link>
            <Link
              href="/feed"
              className={`flex items-center px-3 py-2 ${isActive("/feed")}`}
            >
              <MdDynamicFeed className="h-5 w-5 mr-1" />
              <span>Feed</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
