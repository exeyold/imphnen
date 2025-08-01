import type { Route } from "../+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Home" }];
}

export default function Home() {
  return (
    <h1 className="text-4xl flex justify-center items-center h-screen">Home</h1>
  );
}
