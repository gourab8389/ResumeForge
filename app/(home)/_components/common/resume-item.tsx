import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";

interface ResumeItemProps {
    documentId: string;
    title: string;
    status: "archived" | "private" | "public";
    updatedAt: string;
    themeColor: string | null;
    thumbnail: string | null;
}
const ResumeItem = (
    { documentId, title, status, updatedAt, themeColor, thumbnail }: ResumeItemProps
) => {

    const router = useRouter();

    const docDate = useMemo(()=>{
        if(!updatedAt) return null;
        const formatetedDate = format(updatedAt, "MM dd, yyyy");
        return formatetedDate;
    }, [updatedAt]);
    const gotoDoc = useCallback(() => {
        router.push(`/dashboard/document/${documentId}/edit`);
    },[router, documentId]);
  return (
    <div
    role="button"
    className="cursor-pointer max-w-[164px] w-full border rounded-lg transition-all h-[197px] hover:border-primary hover:shadow-md shadow-primary"
    style={{border: themeColor ?? "#E5E7EB"}}
    >
      
    </div>
  )
}

export default ResumeItem;
