import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/common/header";

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
    <section className="w-full min-h-screen !bg-[#f8f8f8] dark:!bg-background">
      <Header/>
      {children}
    </section>
  )
}

export default HomeLayout
