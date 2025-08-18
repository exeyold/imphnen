import { href, Link } from "react-router";
import { useAuthedContext } from "~/hooks/use-authed-context";

export function meta() {
  return [{ title: "Home" }];
}

export default function Home() {
  const { data } = useAuthedContext();

  return (
    <div className="text-base flex flex-col gap-4 justify-center items-center h-screen max-w-xl mx-auto">
      <code className="border p-4">{JSON.stringify(data?.session)}</code>
      <code className="border p-4">{JSON.stringify(data?.user)}</code>

      <Link to={href("/u/:username", { username: "arraysid" })}>
        Go to User Special Page
      </Link>
    </div>
  );
}
