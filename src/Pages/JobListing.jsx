import { getCompanies } from '@/api/apiCompanies'
import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem,  SelectTrigger, SelectValue } from '@/components/ui/select'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import {  State } from 'country-state-city'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const JobListing = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser()

  // for jobs
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  // for companies
  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch(getCompanies);

  console.log(Jobs);

  // this useEffect is for jobs
  useEffect(() => {
    if (isLoaded)
      fnJobs()
  }, [isLoaded, location, company_id, searchQuery])

  // this useEffect is for Companies
  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded])

  if (!isLoaded) {
    return <BarLoader className="mb-2" width={"100%"} color="lightblue" />
  }

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  }


  const handleSearch = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) setSearchQuery(query);

  };

  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Job</h1>

      {/* adding filters */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
        {/* to filter state */}
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger >
            <SelectValue placeholder="Filter by Location" />
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

        {/* for filtering companies */}
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
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
        <Button onClick={clearFilters} variant="ringHover">Clear Filter</Button>
      </div>

      {loadingJobs && (<BarLoader className="mt-4-2" width={"100%"} color="lightblue" />)}

      {loadingJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {Jobs?.length ? (
            Jobs.map((job) => {
              return (<JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0}
              />
              )
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




