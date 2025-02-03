"use client";

import { cn } from "@/lib/utils";
import { FileText, Globe, Lock, Trash } from "lucide-react";
import React, { FC, useEffect, useState } from "react";

interface ResumeTitleProps {
  initialTitle: string;
  isLoading: boolean;
  status?: "archived" | "private" | "public" | null;
  onSave?: (newTitle: string) => void;
}

const ResumeTitle = ({
  initialTitle,
  isLoading,
  status,
  onSave,
}: ResumeTitleProps) => {
  const [title, setTitle] = useState("Untitled Resume");

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle);
    if (onSave && typeof onSave === "function") {
      onSave(newTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-1 pr-4">
      <FileText className="stroke-primary" size="20px" />
      <h5
        className={cn(
          "text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100"
        )}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      >
        {title}
      </h5>
      <span>
        {status === "private" ? (
            <Lock className="stroke-primary" size="16px" />
        ) : status === "public" ? (
            <Globe className="stroke-primary" size="16px" />
        ) : status === "archived" ? (
            <Trash className="stroke-primary" size="16px" />
        ) : null}
      </span>
    </div>
  );
};

export default ResumeTitle;
