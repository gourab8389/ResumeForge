import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Dot, EllipsisVertical, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns/format";

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

    const docDate = useMemo(() => {
      if (!updatedAt) return null;
      const date = new Date(updatedAt);
      return format(date, "MMM dd, yyyy");
  }, [updatedAt]);
    const gotoDoc = useCallback(() => {
        router.push(`/dashboard/document/${documentId}/edit`);
    },[router, documentId]);
  return (
    <div
    role="button"
    className="cursor-pointer max-w-[164px] w-full border rounded-lg transition-all h-[197px] hover:border-primary hover:shadow-md shadow-primary"
    onClick={gotoDoc}
    style={{borderColor: themeColor ?? "#E5E7EB"}}
    >
      <div className="flex flex-col w-full h-full items-center rounded-lg justify-center bg-[#fdfdfd] dark:bg-secondary">
        <div className="w-full flex flex-1 px-1 pt-2">
          <div className="w-full flex flex-1 bg-white dark:bg-gray-700 rounded-t-lg justify-center items-center">
            {thumbnail ? (
              <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                <Image 
                src={thumbnail} 
                alt={title} 
                fill 
                className="w-full h-full object-cover object-top rounded-t-lg"
                />
              </div>
            ) : (
              <FileText size="30px"/>
            )}
          </div>
        </div>

        {/* Body content */}
        <div className="shrink w-full border-t pt-2 pb-[9px] px-[9px]">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm mb-[2px] truncate block w-[200px]">
              {title}
            </h5>
            <button className="text-muted-foreground">
              <EllipsisVertical size="20px" />
            </button>
          </div>
          <div className="flex items-center !text-[12px] font-medium text-muted-foreground">
            <span className="flex items-center gap-[2px]">
              {status === "private" ? (
                <>
                <Lock size="12px" />
                Private  
                </>
              ) : (
                <>
                <Globe size="12px" className="text-primary"/>
                Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span>
              {docDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeItem;
