import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "./form";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  async function signIn(
    formData: FormData
  ): Promise<{ title: string; content: string }> {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { title: "Something went wrong", content: error.message };
    } else {
      return { title: "Signed in successfully", content: "Have a good day!" };
    }
  }

  return (
    <div className="flex w-full flex-1">
      <div className="w-full flex items-center justify-center grow pad-x">
        <div className="flex flex-col items-center w-fit justify-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Countify</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2 max-w-sm w-full leading-tight">
            More than just a wallet, your free financial assistant, at your
            service
          </h2>
          <p className="text-base mb-6 font-medium text-foreground/60 max-w-sm w-full">
            Try it out now!
          </p>

          {/* OAuth */}
          <Button
            className="w-full max-w-sm flex gap-x-2 items-center mb-3"
            variant={"outline"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="14"
              height="14"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Login with Google</span>
          </Button>

          <p className="mb-1 text-sm text-foreground/60">OR</p>

          {/* Form */}
          <Form signIn={signIn} />
        </div>
      </div>
    </div>
  );
}
