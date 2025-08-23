"use client";

import { Icon } from "@iconify/react";
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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import {
  getSessionQueryOptions,
  useGetSession,
} from "~/features/auth/hooks/use-get-session";

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
            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer"
              onClick={() =>
                router.push(data?.username ? `/u/${data?.username}` : "/setup")
              }
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Icon
                  icon="solar:user-circle-line-duotone"
                  className="size-5 text-gray-500 dark:text-gray-400"
                />
                Your Portfolio
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/apps/home")}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Icon
                  icon="solar:palette-outline"
                  className="size-5 text-gray-500 dark:text-gray-400"
                />
                Applications
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer"
              onClick={() => router.push("/settings")}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Icon
                  icon="solar:settings-line-duotone"
                  className="size-5 text-gray-500 dark:text-gray-400"
                />
                Settings
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer justify-between"
              onClick={() =>
                window.open("/updates", "_blank", "noopener,noreferrer")
              }
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Icon
                  icon="solar:letter-unread-line-duotone"
                  className="size-5 text-gray-500 dark:text-gray-400"
                />
                What&lsquo;s new?
              </span>
              <Icon
                icon="solar:square-top-down-line-duotone"
                className="size-4 text-gray-500 dark:text-gray-400"
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="p-2 rounded-lg cursor-pointer justify-between"
              onClick={() =>
                window.open("/help", "_blank", "noopener,noreferrer")
              }
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Icon
                  icon="solar:question-circle-line-duotone"
                  className="size-5 text-gray-500 dark:text-gray-400"
                />
                Get help?
              </span>
              <Icon
                icon="solar:square-top-down-line-duotone"
                className="size-4 text-gray-500 dark:text-gray-400"
              />
            </DropdownMenuItem>
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
                <Icon
                  icon="solar:logout-2-bold-duotone"
                  className="size-5 text-gray-500 dark:text-gray-400"
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
