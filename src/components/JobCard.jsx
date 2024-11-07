import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BookmarkIcon,MapPinIcon,Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { savedJob } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';

// this job card can be use in multiple places like saved_job page by user and also this card is used for recurter who can delete the card after its use

const JobCard = ({
    job,
    isMyJob=false,
    savedInit = false,
    onJobSaved=()=>{},
}) => {
    const [saved,setSaved]=useState(savedInit)

    const { 
        fn: fnSavedJob,
        data: SavedJob,
        loading: loadingSavedJob,
      } = useFetch(savedJob,{alreadySaved:saved});


    const {user}=useUser();

    const handleSavedJob=async ()=>{
        await fnSavedJob({
            user_id:user.id,
            job_id:job.id,
        });
        onJobSaved();
    }

    useEffect(()=>{
        if(SavedJob !== undefined ) setSaved(SavedJob?.length>0);
    },[SavedJob])

  return <Card className="flex flex-col">
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">{job.Title}

        {!isMyJob && (
            <Trash2Icon fill="red" size ={18} className='text-red-400 cursor-pointer' /> 
        )}
        </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col flex-1  gap-5">
        <div className='flex justify-between'>
            {job.companies && <img src={job.companies.logo} className='h-6' />}
            <div className='flex gap-2 items-center'>
            <MapPinIcon size ={15} /> 
            {job.Location}
            </div>
        </div>
        <hr />
        {job.Discription}
    </CardContent>
    <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className='flex-1'>
        <Button variant="secondary" className="w-full">
            More Details
        </Button>
        </Link>
        {!isMyJob && (
            <Button variant="outline" className="flex-shrink-0" onClick={handleSavedJob} disabled={loadingSavedJob}>
                {
                    saved ? (
                    <BookmarkIcon size={20} stroke='lightblue' fill="blue"/>
                    ) : (
                        <BookmarkIcon size={20} />
                    )
                }
            </Button>
        )}
    </CardFooter>
  </Card>
}

export default JobCard