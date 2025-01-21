import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const DocumentPage = async () => {
  const {getUser} = getKindeServerSession();
const user = await getUser();

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      All resume
      <div>
        <h1>{user?.email}</h1>
        <span>{user?.id}</span>
      </div>  
    </div>
  )
}

export default DocumentPage;
