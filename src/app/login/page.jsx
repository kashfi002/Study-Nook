"use client";
import { Check } from '@gravity-ui/icons';
import {Button,Card,Description,FieldError,Form,Input,Label,TextField} from '@heroui/react';
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const LogInPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signIn.email(
      {
        email: user.email,
        password: user.password,
      },
      {
        onSuccess: () => {
          toast.success("Login successful");
          router.push('/');
          router.refresh();
        },
        onError: () => {
          toast.error("Login failed!");
        },
      }
    );
  };

  const handleGoogleLogIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold text-center mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Log in to your account
        </p>

        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="••••••••" />
            <Description className="text-xs text-gray-500">
              At least 8 characters, 1 uppercase & 1 number
            </Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
          >
            <Check />
            Log In
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">OR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogIn}
            className="w-full flex items-center justify-center gap-3 border rounded-md py-2 text-sm hover:bg-gray-50 transition"
          >
            <FaGoogle className="text-red-500" />
            Log in with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default LogInPage;