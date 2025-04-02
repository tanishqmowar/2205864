import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            API Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore user data, trending posts, and real-time feed updates
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Link
              href="/top-users"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Top Users
              </h2>
              <p className="text-gray-600 mb-4">top users...</p>
              <div className="flex justify-end">
                <FaArrowRight className="text-gray-500" />
              </div>
            </Link>

            <Link
              href="/trending-posts"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Trending Posts
              </h2>
              <p className="text-gray-600 mb-4">
                Discover posts with the most engagement
              </p>
              <div className="flex justify-end">
                <FaArrowRight className="text-gray-500" />
              </div>
            </Link>

            <Link
              href="/feed"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Live Feed
              </h2>
              <p className="text-gray-600 mb-4">Live feed</p>
              <div className="flex justify-end">
                <FaArrowRight className="text-gray-500" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
