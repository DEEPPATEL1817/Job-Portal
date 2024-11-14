import { getCompanies } from '@/api/apiCompanies';
import { addNewJob } from '@/api/apiJobs';
import AddCompanyDrawer from '@/components/AddCompanyDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';
import { State } from 'country-state-city';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { z } from 'zod'



const schema = z.object({
  Title: z.string().min(1, { message: "Title is required" }),
  Discription: z.string().min(1, { message: "discription is required" }),
  Location: z.string().min(1, { message: "Location is required" }),
  Requirements: z.string().min(1, { message: "Requirements is required" }),
  companies_id: z.string().min(1, { message: "companies_id is required" }),
  Salary: z.string().min(1, { message: "Salary is required" }),


})
const PostJobs = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();




  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Location: "",
      companies_id: "",
      Requirements: ""
    },
    resolver: zodResolver(schema),
  });


  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded])

  const {
    fn: fnCreateJob,
    data: dataCreateJOb,
    loading: loadingCreatJob,
    error: errorCreatingJob
  } = useFetch(addNewJob);



  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };


  useEffect(() => {
    if (dataCreateJOb?.length > 0) navigate('/JobListing')
  }, [loadingCreatJob])


  if (!isLoaded || loadingCompanies) {
    return <BarLoader className='mb-4' width={"100%"} color='lightblue' />
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/Jobs" />
  }

  return (
    <div>
      <h1 className="font-extrabold text-3xl sm:text-5xl text-center pb-8">
        Post a Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0'>
        <Input placeholder="Job Title" {...register("Title")} />
        {errors.Title && <p className="text-red-500">{errors.Title.message}</p>}

        <Textarea placeholder="Job Discription" {...register("Discription")} />
        {errors.Discription && (
          <p className="text-red-500">{errors.Discription.message}</p>
        )}

<Input placeholder="Salary" {...register("Salary")} />
        {errors.Salary && <p className="text-red-500">{errors.Salary.message}</p>}


        <div className='flex gap-4 items-start'>
          <Controller
            name="Location"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} onValueChange={field.onChange}>
                <SelectTrigger >
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      );
                    })}

                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />



          {/* filter is not working  */}

          <Controller
            name="companies_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger >
                  <SelectValue placeholder="Filter by Companies">
                    {field.value ? companies?.find((com) => com.id === Number(field.value))?.name : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => {
                      return (
                        <SelectItem key={name} value={id}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* add company drawer */}

        <AddCompanyDrawer fetchCompanies={fnCompanies} />

        </div>
        {errors.Location && <p className="text-red-500">{errors.Location.message}</p>}

        {errors.companies_id && <p className="text-red-500">{errors.companies_id.message}</p>}


        

        <Controller
          name="Requirements"
          control={control}
          render={({ field }) => (

            <MDEditor value={field.value} onChange={field.onChange} />
          )} />


        {errors.Requirements && <p className="text-red-500">{errors.Requirements.message}</p>}

        {errorCreatingJob?.message && (<p className="text-red-500">{errorCreatingJob?.message}</p>)}

        {loadingCreatJob && <BarLoader width={"100%"}

          color='lightblue' />}
        <Button type="submit" variant="blue" size="lg" className="mt-2" >Submit</Button>

      </form>
    </div>

  )
}

export default PostJobs