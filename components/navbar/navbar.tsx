import { createClient } from "@/utils/supabase/server";

import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";

// Icons
import { Info, Wallet, Zap } from "lucide-react";
import { LogoutButton } from "./auth";

export async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between py-4 lg:py-8 w-full pad-x">
      <div className="flex items-center">
        <span className="text-lg font-bold">Countify</span>
      </div>
      {user && (
        <div className="md:flex items-center gap-x-8 hidden">
          <Link href="/" className="flex flex-col gap-y-1 anim font-medium">
            <div className="flex items-end gap-x-1.5 group">
              <Wallet
                size={16}
                className="text-foreground/60 group-hover:text-green-500 anim"
              />
              <span className="leading-none text-foreground/60 group-hover:text-foreground anim">
                Wallet
              </span>
            </div>
          </Link>
          <Link href="/" className="flex flex-col gap-y-1 anim font-medium">
            <div className="flex items-end gap-x-1.5 group">
              <Zap
                size={16}
                className="text-foreground/60 group-hover:text-yellow-400 anim"
              />
              <span className="leading-none text-foreground/60 group-hover:text-foreground anim">
                Analytics
              </span>
            </div>
          </Link>
          <Link href="/" className="flex flex-col gap-y-1 anim font-medium">
            <div className="flex items-end gap-x-1.5 group">
              <Info
                size={16}
                className="text-foreground/60 group-hover:text-foreground anim"
              />
              <span className="leading-none text-foreground/60 group-hover:text-foreground anim">
                About
              </span>
            </div>
          </Link>
        </div>
      )}
      <div className="flex items-center">
        {!user ? (
          <Button asChild className="" variant={"secondary"}>
            <Link href="/login">Sign In</Link>
          </Button>
        ) : (
          <LogoutButton />
        )}
      </div>
    </nav>
  );
}
