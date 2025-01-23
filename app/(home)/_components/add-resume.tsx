"use client"
import { FileText, Loader, Plus } from 'lucide-react';
import React, { useCallback } from 'react'

const AddResume = () => {
  const isPending = false;
  const onCreate = useCallback(() => {}, [])
  
  return (
    <>
    <div 
    className="p-[2px] w-full cursor-pointer max-w-[164px]" role='button' 
    onClick={onCreate}
    >
      <div className="py-24 h-[183px] flex flex-col rounded-lg gap-2 w-full max-w-full items-center justify-center border bg-white hover:border-primary transition hover:shadow dark:bg-secondary">
        <span>
          <Plus size="30px" />
        </span>
        <p className='text-sm font-semibold'>Blank Resume</p>
      </div>
    </div>
    {isPending && (
      <div className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center backdrop-blur bg-black/30 w-full h-full">
        <Loader size="35px" className='animate-spin'/>
        <div className="flex items-center gap-2">
          <FileText/>
          Creating Blank Resume...
        </div>
      </div>
    )}
    </>
  )
}

export default AddResume;
