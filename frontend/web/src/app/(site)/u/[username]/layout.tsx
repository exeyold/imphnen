import Image from "next/image";
import Link from "next/link";
import {
  FiBriefcase,
  FiCalendar,
  FiFileText,
  FiLink,
  FiMessageSquare,
  FiMoreHorizontal,
} from "react-icons/fi";

const badges = [
  {
    id: 1,
    name: "Contributor",
    image:
      "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  },
  {
    id: 2,
    name: "Early Adopter",
    image:
      "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  },
  {
    id: 3,
    name: "Open Source",
    image:
      "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  },
  {
    id: 4,
    name: "Mentor",
    image:
      "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  },
];

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-2xl flex flex-col border-x">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="p-6 flex flex-col">
          {/* Avatar + Name + Level */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-5">
              <Image
                src="https://avatars.githubusercontent.com/u/49753444?v=4"
                width={88}
                height={88}
                className="rounded-2xl border-2 border-foreground shadow-sm"
                alt="profile-picture"
                unoptimized
              />
              <div>
                <h1 className="text-2xl font-bold">Harun Alrasyid</h1>
                <p className="text-sm">@arraysid</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 text-sm mb-4">
            <div className="flex items-center gap-2">
              <FiBriefcase className="shrink-0" />
              <span className="font-medium">Fullstack Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLink className="shrink-0" />
              <a
                href="https://arrays.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                arrays.id
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="shrink-0" />
              <span>Joined Feb 11, 2024</span>
            </div>
          </div>

          {/* Badge Showcase */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-2">Badges</h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center text-xs"
                >
                  <Image
                    src={badge.image}
                    width={48}
                    height={48}
                    alt={badge.name}
                    className="rounded-lg shadow border"
                    unoptimized
                  />
                  <span className="mt-1 truncate max-w-[60px] text-center">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-sm font-medium">
          <Link
            href={`/u/${username}`}
            className="flex-1 py-3 border-b-2 border-black flex items-center justify-center gap-2"
          >
            <FiBriefcase className="size-4" /> Work
          </Link>
          <Link
            href={`/u/${username}/resume`}
            className="flex-1 py-3 border-b-2 border-transparent hover:border-sky-300 flex items-center justify-center gap-2"
          >
            <FiFileText className="size-4" /> Resume
          </Link>
          <Link
            href={`/u/${username}/post`}
            className="flex-1 py-3 border-b-2 border-transparent hover:border-sky-300 flex items-center justify-center gap-2"
          >
            <FiMessageSquare className="size-4" /> Post
          </Link>
        </div>

        {/* Posts/Threads */}
        <div className="divide-y">{children}</div>
      </div>
    </div>
  );
}
