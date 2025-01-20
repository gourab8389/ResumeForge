import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      landing page
      <LoginLink className="bg-blue-800 text-white rounded-lg p-2">Sign in</LoginLink>
      <RegisterLink className="bg-blue-800 text-white rounded-lg p-2">Sign up</RegisterLink>
      <Button>hello</Button>
    </div>
  );
}
