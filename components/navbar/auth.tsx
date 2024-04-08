import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { BarChart2, Cog, LogOut } from "lucide-react";

const LogoutButton = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    return redirect("/login");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="border-border -translate-x-1/3 mt-4 px-3 py-4 w-fit">
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-x-3 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium">Shadcn</p>
              <p className="text-xs text-foreground/60">{user?.email}</p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-border" />
          <div className="flex flex-col gap-y-0.5">
            <Button
              variant="ghost"
              className="w-full justify-start items-center flex px-1 py-1 hover:bg-transparent hover:text-foreground anim text-foreground/60 h-fit"
            >
              <Cog size={16} className="mr-3 inline-block" />
              Account Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start items-center flex px-1 py-1 hover:bg-transparent hover:text-foreground anim text-foreground/60 h-fit"
            >
              <BarChart2 size={16} className="mr-3 inline-block" />
              Analytics
            </Button>
          </div>
          <div className="w-full h-0.5 bg-border" />
          <form action={signOut} className="w-full">
            <Button
              variant="ghost"
              type="submit"
              className="w-full justify-start items-center flex px-1 py-1 hover:bg-transparent hover:text-foreground anim text-foreground/60 h-fit"
            >
              <LogOut size={16} className="mr-3 inline-block" />
              Logout
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { LogoutButton };
