import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const Onboarding = () => {
  const{user,isLoaded}=useUser();
  const navigate=useNavigate()

  //store user data in clerk only
  const handleRole=async(role)=>{
    await user.update({
      unsafeMetadata:{role},
    }).then(()=>{
      navigate(role==="recruiter" ? "/PostJobs" : "/JobListing");
    })
    .catch((error)=>{
      throw error
    })
  }

  //useeffect will help not to fallback once user select his role 
  // it will not allow user to change his role or not allow to come again on Onboarding page after user select his role 
 useEffect(()=>{
  if(user?.unsafeMetadata?.role){
    navigate(user?.unsafeMetadata?.role ==="recruiter" ? "/PostJobs" : "/JobListing");
  }
 },[user]);
  
  
  if(!isLoaded){
    return <BarLoader className="mb-2" width={"100%"} color="lightblue"/>
  }
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <h2 className=' font-extrabold text-4xl sm:text-5xl md:text-6xl'>
        Who You Are...
      </h2>
      <div className='mt-32 grid grid-cols-1 md:grid-cols-2  gap-4 w-full md:px-28'>
        <Button variant="blue" className="h-24 text-2xl" onClick={()=>handleRole("candidate")}>Candidate</Button>
        <Button variant="outline" className="h-24 text-2xl" onClick={()=>handleRole("recruiter")}>Employeer</Button>
      </div>
    </div>
  )
}

export default Onboarding