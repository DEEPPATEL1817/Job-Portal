import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
// import Jobs from './Jobs';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Select, SelectContent,  SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import  { ApplyJobDrawer } from '@/components/ApplyJobDrawer';
import ApplicationCard from '@/components/ApplicationCard';

const JobPage = () => {

  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, { job_id: id });


  
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
   
  );


 
  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };


  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded])

  if (!isLoaded || loadingJob) {
    return (<BarLoader className="mt-4-2" width={"100%"} color="lightblue" />)
  }


  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='font-extrabold pb-3 text-4xl sm:text-4xl'>{job?.Title}</h1>
        <img src={job?.companies?.logo} alt={job?.Title} className='h-12' />
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPinIcon />
          <p >{job?.Location}</p>

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
      {loadingHiringStatus && <BarLoader className="mt-4-2" width={"100%"} color="lightblue" />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <p className='sm:text-lg'>{job?.Discription}</p>


      <h2 className='text-2xl sm:text-3xl font-bold'>What we are looking for: </h2>


      <MDEditor.Markdown
        source={job?.Requirements} className='bg-transparent sm:text-lg'
        />
        <h2 className='text-2xl sm:text-3xl font-bold'>Salary: {job?.Salary}</h2>

      {/* render application */}
      
      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.application?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.application?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
          {job?.application.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
            )}
    </div>
  )
}

export default JobPage