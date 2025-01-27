"use client";

import useGetDocument from '@/features/document/use-get-document'
import { Loader, RotateCw } from 'lucide-react';
import React, { Fragment } from 'react'
import ResumeItem from './common/resume-item';

const ResumeList = () => {
  const { data, isLoading, isError, refetch} = useGetDocument();
  const resumes = data?.data ?? [];
  return (
    <Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center mx-5">
          <Loader className='animate-spin text-black dark:text-white size-10'/>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center mx-5">
          <button className="flex items-center gap-1" onClick={() => refetch()}>
            <RotateCw size="1em" />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <>
        {resumes.map((resume) => (
          <ResumeItem
          key={resume.documentId}
          documentId={resume.documentId}
          title={resume.title}
          status={resume.status}
          updatedAt={resume.updatedAt}
          themeColor={resume.themeColor}
          thumbnail={resume.thumbnail}
          />
        ))}
        </>
      )}
    </Fragment>
  )
}

export default ResumeList
