"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignInFunction = (
  formData: FormData
) => Promise<{ title: string; content: string }>;

interface FormProps {
  signIn: SignInFunction;
}

const Form: React.FC<FormProps> = ({ signIn }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const { title, content } = await signIn(formData);
      toast({
        title: title,
        description: content,
      });
      if (title === "Signed in successfully") {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center text-foreground w-full max-w-sm"
    >
      <div className="flex flex-col-reverse items-start w-full mb-1 gap-1">
        <Input
          className="py-4 peer h-11"
          type="email"
          id="email"
          name="email"
          placeholder="example@mail.com"
          required
        />
        <Label
          className="text-base bg-background w-fit anim px-2 translate-x-1 translate-y-4"
          htmlFor="email"
        >
          Email <span className="font-semibold text-green-500 ml-1">*</span>
        </Label>
      </div>
      <div className="flex flex-col-reverse items-start w-full mb-1 gap-1 relative">
        <Input
          className="py-4 peer h-11"
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Label
          className="text-base bg-background w-fit anim px-2 translate-x-1 translate-y-4"
          htmlFor="password"
        >
          Password <span className="font-semibold text-green-500 ml-1">*</span>
        </Label>

        {/* Forgot */}
        <Link
          href={"/forgot-password"}
          className="text-xs underline text-foreground -bottom-1 bg-background right-2 px-1 w-fit absolute anim"
        >
          Forgot password?
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-full mt-4 gap-y-3">
        <Button
          formAction={signIn}
          className="w-full"
          variant={"default"}
          type="submit"
        >
          Sign In
        </Button>
        <p className="w-full text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Form;
