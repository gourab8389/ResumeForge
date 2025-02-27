"use client";
import React from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import PersonalInfo from "./preview/personal-info";
import SummaryPreview from "./preview/summary-preview";
import ExperiencePreview from "./preview/experience-preview";
import EducationPreview from "./preview/educational-preview";
import SkillPreview from "./preview/skill-preview";

const ResumePreview = () => {
  const { resumeInfo } = useResumeContext();
  const isLoading = false;

  return (
    <div
      id="resume-preview-id"
      className={cn(`
        shadow-lg bg-white w-full flex-[1.02]
        h-full p-10 !font-open-sans
        dark:border dark:bg-card 
        dark:border-b-gray-800 
        dark:border-x-gray-800
        `)}
      style={{
        borderTop: `13px solid ${resumeInfo?.themeColor}`,
      }}
    >
      {/* {Personnal Info} */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Summary} */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Educational Info} */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Skills} */}
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* {Professional Exp} */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
