"use client";

import { authClient } from "@packages/client/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@packages/ui/dropdown-menu";
import {
  Logout,
  Palette,
  QuestionCircle,
  Settings,
  SquareTopDown,
  Unread,
  UserCircle,
} from "@solar-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import {
  getSessionQueryOptions,
  useGetSession,
} from "~/features/auth/hooks/use-get-session";

const menu = {
  main: [
    {
      label: "Your Portfolio",
      icon: (
        <UserCircle
          className="size-5 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      action: (router: ReturnType<typeof useRouter>, username = "") =>
        router.push(username ? `/u/${username}` : "/setup"),
    },
    {
      label: "Applications",
      icon: (
        <Palette
          className="size-5 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      action: (router: ReturnType<typeof useRouter>) =>
        router.push("/apps/home"),
    },
    {
      label: "Settings",
      icon: (
        <Settings
          className="size-5 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      action: (router: ReturnType<typeof useRouter>) =>
        router.push("/settings"),
    },
  ],
  secondary: [
    {
      label: "What‘s new?",
      icon: (
        <Unread
          className="size-5 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      extraIcon: (
        <SquareTopDown
          className="size-4 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      action: () => window.open("/updates", "_blank", "noopener,noreferrer"),
    },
    {
      label: "Get help?",
      icon: (
        <QuestionCircle
          className="size-5 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      extraIcon: (
        <SquareTopDown
          className="size-4 text-gray-500 dark:text-gray-400"
          weight="LineDuotone"
        />
      ),
      action: () => window.open("/help", "_blank", "noopener,noreferrer"),
    },
  ],
};

export const UserDropdown = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700">
          <AvatarImage src={data?.image ?? ""} alt={data?.name} />
          <AvatarFallback>
            {data?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="no-scrollbar w-[310px] rounded-2xl bg-gray-50 dark:bg-black/90 p-0"
        align="end"
      >
        <section className="bg-white dark:bg-gray-100/10 backdrop-blur-lg rounded-2xl p-1 shadow border border-gray-200 dark:border-gray-700/20">
          <div className="flex items-center p-2">
            <div className="flex-1 flex items-center gap-2">
              <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700">
                <AvatarImage src={data?.image ?? ""} alt={data?.name} />
                <AvatarFallback>
                  {data?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {data?.name}
                </h3>
                <p className="text-muted-foreground text-xs">{data?.email}</p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menu.main.map(({ label, icon, action }, i) => (
              <DropdownMenuItem
                key={i}
                className="p-2 rounded-lg cursor-pointer"
                onClick={() => action(router, data?.username ?? "")}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  {icon}
                  {label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menu.secondary.map(({ label, icon, extraIcon, action }, i) => (
              <DropdownMenuItem
                key={i}
                className="p-2 rounded-lg cursor-pointer justify-between"
                onClick={action}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  {icon}
                  {label}
                </span>
                {extraIcon}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </section>

        <section className="mt-1 p-1 rounded-2xl">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer"
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries({
                        queryKey: getSessionQueryOptions.queryKey,
                      });
                      router.push("/");
                    },
                  },
                });
              }}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Logout
                  className="size-5 text-gray-500 dark:text-gray-400"
                  weight="LineDuotone"
                />
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
