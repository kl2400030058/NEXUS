import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
                Enter your credentials to access your account.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <UserAuthForm authType="login" />
             <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline hover:text-primary">
                    Sign up
                </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
