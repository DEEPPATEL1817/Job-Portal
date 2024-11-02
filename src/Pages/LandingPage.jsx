import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import compaines from '../data/compaines.json'
import Autoplay from 'embla-carousel-autoplay'
import faq from '../data/faq.json'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  return <>
    <main>
      <section className='flex justify-center  mt-10 flex-col text-center leading-4 '>
        <h1 className='font-extrabold text-4xl sm:text-6xl lg:text-8xl leading-normal'>
          Search,Apply & <br /> Get Your <span className='text-blue-400'>Dream Job</span>
        </h1>
        <h6 className='sm:mt-4 text-xs sm:text-xl leading-normal'>Start your hunt for the best,life-changing carrer opportunities from here in your <br />selected area conveniently and get hired quickly</h6>
      </section>

      <div className='flex flex-col lg:flex-row gap-6 justify-center py-10'>
        <Link to='/JobListing' >
          <Button variant="blue" size="xl" className='w-full sm:w-auto'>Find JOb</Button>
        </Link>
        <Link to='/PostJobs' >
          <Button variant="outline" size="xl" className='w-full sm:w-auto'>Post a Job</Button>
        </Link>
      </div>

      <Carousel
        // plugins={[Autoplay({ delay: 500 })]}
        className="w-full py-10 overflow-hidden">
        <CarouselContent className="flex gap-5  animate-scroll sm:gap-20 items-center ">
          {compaines.map(({ name, id, path }) => {
            return <CarouselItem key={id} className="basis-1/3 lg:basis-1/5">
              <img src={path} alt={name}
                className='h-9 sm:h-14 object-contain' />
            </CarouselItem>
          })}
        </CarouselContent>
      </Carousel>

      <img src="/banner.jpeg" className='w-full h-auto  object-cover' alt="" />

      <section className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications ,and more.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold">For Employeers</CardTitle>
          </CardHeader>
          <CardContent>
            Post Jobs,manage application,and find the best candidate.
          </CardContent>
        </Card>

      </section>

      <Accordion type="single" collapsible>
        {faq.map((faq, index) => {
          return(
            <AccordionItem key={index} value={`item-${index+1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
          );
        })}
      </Accordion>


    </main>
  </>
}

export default LandingPage







