import { getSingleJob } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import Jobs from './Jobs';
import { Briefcase, DoorClosed, DoorOpen, MapPin, MapPinIcon } from 'lucide-react';

const JobPage = () => {

  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });




  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded])

  if (!isLoaded || loadingJob) {
    return (<BarLoader className="mt-4-2" width={"100%"} color="lightblue" />)
  }


  return (
    <div>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='font-extrabold pb-3 text-4xl sm:text-4xl'>{job?.Title}</h1>
        <img src={job?.companies?.logo} alt={job?.Title} className='h-12' />
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon />
          <p >{job?.Location}deep</p>

        </div>
        <div className='flex gap-2'>
          {/* this is remaining   time span - 2:16*/}
          <Briefcase />{job?.application?.length}Applicants
        </div>
        <div className='flex gap-2'>
          {job?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>
      {/* hiring Status */}
      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{job?.Discription}</p>
      

      <h2 className='text-2xl sm:text-3xl font-bold'>What we are looking for: </h2>
    </div>
  )
}

export default JobPage