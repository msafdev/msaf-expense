"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignUpFunction = (
  formData: FormData
) => Promise<{ title: string; content: string }>;

interface FormProps {
  signUp: SignUpFunction;
}

const Form: React.FC<FormProps> = ({ signUp }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    try {
      const { title, content } = await signUp(formData);
      toast({
        title: title,
        description: content,
      });
      if (title === "Signed up successfully") {
        router.push("/login");
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
      <div className="flex flex-col-reverse items-start w-full mb-1 gap-1">
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
      </div>
      <div className="flex flex-col-reverse items-start w-full mb-1 gap-1">
        <Input
          className="py-4 peer h-11"
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="••••••••"
          required
        />
        <Label
          className="text-base bg-background w-fit anim px-2 translate-x-1 translate-y-4"
          htmlFor="confirm-password"
        >
          Confirm Password{" "}
          <span className="font-semibold text-green-500 ml-1">*</span>
        </Label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col w-full mt-4 gap-y-3">
        <Button className="w-full" variant={"default"}>
          Sign Up
        </Button>
        <p className="w-full text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Form;
