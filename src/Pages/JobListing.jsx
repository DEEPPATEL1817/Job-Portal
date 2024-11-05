import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const JobListing = () => {

  const[searchQuery,setSearchQuery]=useState("")
  const[location,setLocation]=useState("")
  const[company_id,setCompany_id]=useState("")
  const {isLoaded}= useUser()

  const { 
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {location,company_id,searchQuery});

  console.log(jobs); 

  useEffect(()=>{
    if(isLoaded)
      fnJobs()
  },[isLoaded,location,company_id,searchQuery])

  if(!isLoaded){
    return <BarLoader className="mb-2" width={"100%"} color="lightblue"/>
  }

  
  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Job</h1>

      {/* adding filters */}

      {loadingJobs && (<BarLoader className="mt-4-2" width={"100%"} color="lightblue"/>)}

      {loadingJobs === false && (
        <div>
          {jobs?.length ?(
            jobs.map((job)=>{
              return <JobCard key={job.id} job={job}/>
            })
          ) : (
            <div>NO Jobs found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing