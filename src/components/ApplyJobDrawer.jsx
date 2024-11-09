import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form'
import useFetch from '@/hooks/useFetch'
import { applyJob } from '@/api/apiApplication'
import { BarLoader } from 'react-spinners'

// here using a zod library for validation of react-hook form

const schema=z.object({
    experience:z.number().min(0,{message:"Experience should not be less than 0"}).int(),
    skills: z.string().min(1,{message:"required"}),
    education:z.enum(["Higher-Secondary","Graduate","Post-Graduate"],{message:"Education is Required"}),
    resume:z.any().refine(file=>file[0]&& 
        (file[0].type==="application/pdf" || file[0].type==="application/msword"),{message:"Only PDF or Word File are allowed"})
});




const ApplyJobDrawer = ({user,job,applied=false,fetchJob}) => {
 

    const {register,handleSubmit,control,formState:{errors},reset}=useForm({
        resolver: zodResolver(schema),
    })

    const {
        loading:loadingApply,
        error:errorApply,
        fn:fnApply
    }=useFetch(applyJob)

// here we are sending all the column field from database application table in the form of ...data
    const onSubmit=(data)=>{
        fnApply({...data,
            job_id : job.id,
            candidate_id : user.id,
            name : user.fullName,
            status : "applied",
            resume: data.resume[0]
        }).then(()=>{
            fetchJob();
            reset()
        })
    }

  return (
    <Drawer open={applied ? false:undefined}>
  <DrawerTrigger asChild>
    <Button size="lg" variant={job?.isOpen && !applied ? "blue" : " distructive"}
     disabled={!job?.isOpen || applied}
    >
        {job?.isOpen ? (applied ? "Applied" : " Apply") : "Hiring Closed "}
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Apply for {job?.Title} at {job?.companies?.name}</DrawerTitle>
      <DrawerDescription>Please fill the form below.</DrawerDescription>
    </DrawerHeader>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0'>
        <Input
        type="number" placeholder="Years of Experience"
        className="flex-1"
        {...register("experience",{
            valueAsNumber:true,
        })}
        />

        {errors.experience && (
            <p className='text-red-400'>{errors.experience.message}</p>
        )}



        <Input
        type="text" placeholder="Skills.."
        className="flex-1" 
        {...register("skills")}
        />

        {errors.skills && (
            <p className='text-red-400'>{errors.experience.message}</p>
        )}

<Controller 
name="education" control={control}
render={({field})=>(
    <RadioGroup onValueChange={field.onChange} {...field}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Higher-secondary" id="Higher-secondary" />
    <Label htmlFor="Higher-secondary">Higher Secondary</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Graduation" id="Graduation" />
    <Label htmlFor="Graduation">Graduation</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="Post-Graduate" id="Post-Graduate" />
    <Label htmlFor="Post-Graduate">Post Graducation</Label>
  </div>
</RadioGroup>
)}
/>
    {errors.education && (
        <p className='text-red-400'>{errors.education.message}</p>
    )}


    <Input
        type="file" 
        accept=".pdf , .doc , .docx "
        className="flex-1 file:text-gray-500" 
        {...register("resume")}
        />

        {errors.skills && (
            <p className='text-red-400'>{errors.experience.message}</p>
        )}

        {/* below error is coming from the server and above is from zod validation */}
        {errorApply?.message && (
            <p className='text-red-400'>{errorApply?.message}</p>
        )}

        {loadingApply && <BarLoader className="mb-2" width={"100%"} color="lightblue" />}

        <Button type="submit" variant="blue" size="lg">Apply</Button>
    </form>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default ApplyJobDrawer