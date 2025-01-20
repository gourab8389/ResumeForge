import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout = async (
    { children }: HomeLayoutProps
) => {
  const {isAuthenticated} = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  
  if (!isUserAuthenticated) {
    redirect("/");
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default HomeLayout
