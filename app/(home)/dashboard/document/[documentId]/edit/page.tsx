import React from 'react'
import { ResumeInfoProvider } from '@/context/resume-info-provider'
import EditResume from '../../../../_components/edit-resume'

const DocumentIdPage = () => {
  return (
    <div>
      <ResumeInfoProvider>
        <EditResume/>
      </ResumeInfoProvider>
    </div>
  )
}

export default DocumentIdPage
