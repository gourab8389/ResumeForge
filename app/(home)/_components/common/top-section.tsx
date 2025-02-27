"use client"

import { useResumeContext } from "@/context/resume-info-provider";
import { AlertCircle } from "lucide-react";
import ResumeTitle from "./resume-title";

const TopSection = () => {
    const { resumeInfo } = useResumeContext();
  return (
    <>
    {resumeInfo?.status === "archived" && (
        <div className="absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center text-base p-2 text-white flex items-center gap-x-2 justify-center font-medium">
            <AlertCircle size={"16px"}/>
            This resume is in the trash bin
        </div>
    )}
    <div className="w-full flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
            <ResumeTitle
                initialTitle={resumeInfo?.title || ""}
                status={resumeInfo?.status}
                onSave={(value) => console.log(value)}
                isLoading={false}
            />
        </div>
        <div className="flex items-center gap-2">
            {/* theme color */}

            {/* Preview Modal */}

            {/* Download button */}

            {/* Share resume */}

            {/* more option */}
        </div>
    </div>
    </>
  )
}

export default TopSection;
