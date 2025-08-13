import { buttonVariants } from "@packages/ui/button";
import { href, Link } from "react-router";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "IMPHNEN" }];
}

export default function Home() {
  return (
    <div className="flex gap-4 flex-col justify-center items-center h-screen">
      <Link to={href("/home")} className={buttonVariants()}>
        Go to Home
      </Link>
      <Link to={href("/signup")} className={buttonVariants()}>
        Signup
      </Link>
    </div>
  );
}
