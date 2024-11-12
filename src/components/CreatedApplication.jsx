import { getApplication } from '@/api/apiApplication'
import useFetch from '@/hooks/useFetch'
import React, { useEffect } from 'react'
import ApplicationCard from './ApplicationCard'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'

const CreatedApplication = () => {
    const {user}=useUser()
    const{
        loading:loadingApplications,
        data:application,
        fn:fnApplications
    }=useFetch(getApplication,{user_id:user.id})

    useEffect(()=>{
        fnApplications();
    },[])

    if(loadingApplications){
        <BarLoader className='mb-4' width={"100%"} color='lightblue' />
    }
  return (
    <div className="flex flex-col gap-2">
    {application?.map((application) => {
      return (
        <ApplicationCard
          key={application.id}
          application={application}
          isCandidate={true}
        />
      );
    })}
  </div>
  )
}

export default CreatedApplication