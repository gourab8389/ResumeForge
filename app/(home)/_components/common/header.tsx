"use client";

import Logo from "@/components/shared/logo";
import ThemeMode from "@/components/shared/theme-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Loader } from "lucide-react";
import { Fragment } from "react";

const Header = () => {
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();

  return (
    <div className="shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]">
      <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-9">
          <Logo />
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span className="font-normal text-black/50 dark:text-primary-foreground">
                Hi,
              </span>
              <h2 className="font-bold text-black dark:text-primary-foreground text-lg">
                {user?.given_name} {user?.family_name}
              </h2>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <ThemeMode/>
          
          {isLoading || error ? (
            <Loader className="!size-6 animate-spin text-black dark:text-white/80" />
          ) : (
            <Fragment>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger role="button" className="rounded-full">
                    <div className="flex items-center gap-1">
                      <Avatar role="button" className="!cursor-pointer">
                        <AvatarImage src={user?.picture || ""} />
                        <AvatarFallback className="!cursor-pointer">
                          {user?.given_name?.charAt(0)}
                          {user?.family_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="my-3">
                    <DropdownMenuItem
                      asChild
                      className="!text-red-500 font-medium !cursor-pointer"
                    >
                      <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
