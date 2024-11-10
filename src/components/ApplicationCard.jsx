import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/useFetch';
import { BarLoader } from 'react-spinners';
import { updateApplicationStatus } from '@/api/apiApplication';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ApplicationCard = ({ application, isCandidate = false }) => {


    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    };

    const {loading:loadingHiringStatus, fn:fnHiringStatus}=useFetch(updateApplicationStatus,{job_id :application.job_id})


    const  handleStatusChange =(status)=>{
        fnHiringStatus(status)
    }
    //   const handleDownload = () => {
    //     const link = document.createElement("a");
    //     link.href = application?.resume;
    //     link.target = "_blank";
    //     link.click();
    //   };

    return (
        <div>
            <Card >
                {!loadingHiringStatus && <BarLoader width={"100%"} color='color="lightblue"' />}
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        {isCandidate
                            ? `${application?.job?.Title} at ${application?.job?.companies?.name}`
                            : application?.name}
                        <Download size={18} onClick={handleDownload} className='bg-white text-black rounded-3xl h-8 w-8 p-1.5 cursor-pointer' ></Download>
                    </CardTitle>
                </CardHeader>
                <CardContent >

                    <div className='flex gap-2 items-center'>
                        <BriefcaseBusiness size={15} />{application?.experience} years of experince
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <School size={15} />{application?.education}  </div>
                    </div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <Boxes size={15} />{application?.skills}  </div>
                    </div>
                    <hr />
                </CardContent>

                <CardFooter className="flex justify-between">
                  <span>{new Date(application?.created_at).toLocaleString()}</span>
                          {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
            </Card>
        </div >
    )
}

export default ApplicationCard