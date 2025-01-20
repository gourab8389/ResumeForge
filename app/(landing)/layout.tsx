import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = async ({ children }: LandingLayoutProps) => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
};

export default LandingLayout;
