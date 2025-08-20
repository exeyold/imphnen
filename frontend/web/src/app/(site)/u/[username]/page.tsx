import Image from "next/image";
import { FiHeart, FiMessageSquare, FiShare } from "react-icons/fi";

export default function Page() {
  const posts = [
    {
      id: 1,
      content:
        "Just launched my new portfolio website! Built with Next.js and Tailwind CSS. Check it out!",
      likes: 24,
      replies: 8,
      time: "2h ago",
    },
    {
      id: 2,
      content:
        "Working on a new open source project. Can't wait to share it with everyone!",
      likes: 42,
      replies: 12,
      time: "1d ago",
    },
    {
      id: 3,
      content:
        "The future of web development is looking bright with all these amazing tools and frameworks available.",
      likes: 19,
      replies: 3,
      time: "3d ago",
    },
  ];

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="p-4">
          <div className="flex items-start gap-3">
            <Image
              src="https://avatars.githubusercontent.com/u/49753444?v=4"
              width={42}
              height={42}
              className="rounded-full border"
              alt="profile-picture"
              unoptimized
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Harun Alrasyid</span>
                <span>@arraysid</span>
                <span>·</span>
                <span>{post.time}</span>
              </div>
              <p className="mb-3">{post.content}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1">
                  <FiHeart className="size-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1">
                  <FiMessageSquare className="size-4" />
                  <span>{post.replies}</span>
                </button>
                <button className="flex items-center gap-1">
                  <FiShare className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
