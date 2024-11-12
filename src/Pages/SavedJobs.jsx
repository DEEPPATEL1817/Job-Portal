import { getSavedJobs, savedJob } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const SavedJobs = () => {
  const {isLoaded}=useUser()

  const{
    loading:loadingSavedJobs,
    data:SavedJobs,
    fn:fnSavedJobs
  }=useFetch(getSavedJobs);

  useEffect(()=>{
    if(isLoaded)
      fnSavedJobs();
  },[isLoaded])

  if(!isLoaded || loadingSavedJobs){
    return <BarLoader className='mb-4' width={"100%"} color="lightblue" />
  }

  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>
      SavedJobs
      </h1>

      {loadingSavedJobs
       === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {SavedJobs?.length ? (
            SavedJobs.map((saved) => {
              return (<JobCard key={saved.id} job={saved.job} savedInit={true}
                onJobSaved={fnSavedJobs}
              />
              )
            })
          ) : (
            <div>No Saved Jobs found</div>
          )}
        </div>
      )}
      </div>
  )
}

export default SavedJobs