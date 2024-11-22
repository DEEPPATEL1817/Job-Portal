import React from 'react'

const About = () => {
    return (
        <div>
            <h1 className='font-extrabold text-3xl sm:text-5xl  underline text-center pb-8 '>About Us</h1>
            <p className='font-light text-2xl sm:text-3xl text-center'>At Job Nexus, we are dedicated to bridging the gap between talent and opportunity. We understand that the journey to a fulfilling career and the search for the right team can be challenging. Job Nexus was founded to simplify this process, providing a seamless platform for job seekers to discover new roles and for companies to find ideal candidates efficiently.<br />
            <br />


                With a user-friendly interface and a focus on innovation, Job Nexus stands out as a trusted hub for both job seekers and recruiters. Our aim is to enhance career growth, foster connections, and empower people to find roles that align with their skills, passion, and aspirations. Whether you are taking your first step into the professional world or seeking a change, Job Nexus is here to guide you on your career path.</p>

            <div className="flex justify-center items-center h-screen mt-12">
                <img src="/JobNexus-co.png" alt="" className="w-auto h-34" />
            </div>


            <h1 className='font-light pt-8 text-3xl underline sm:text-5xl text-center '>Our Vision</h1>
            <p className='font-light text-2xl sm:text-3xl mt-10 text-center '>Job Nexus envisions a world where the hiring process is swift, transparent, and rewarding for everyone involved. We are driven by the belief that every candidate deserves a chance to shine and every company deserves access to top talent. Our mission is to evolve as the premier job network, setting a new standard for excellence in recruitment and career development.</p>

            <div className='flex sm:justify-evenly mt-10 flex-col'>
                <div className='mt-4'>
                    <h1 className='text-3xl text-gray-400 underline '>Corporate Office</h1>
                    <p className='mt-4'>Job Nexus Limited <br />
                        A - 8, Sector - 118<br />
                        Noida - 201304<br />
                        India<br />
                        Phone: +91-130-8712514, +91-130-2587131<br />
                        Fax: +91-130-3257840<br />
                        E-mail: JobNexus@naukri.com</p>
                </div>

                
                
                <div className='mt-4'>
                    <h1 className='text-3xl text-gray-400 underline '>Registered Office</h1>
                    <p className='mt-4'>Job Nexus Limited <br />
                        B - 10, Arihant Heights<br />
                        Bangaluru - 560004<br />
                        India<br />
                        Phone: +91-130-8712514, +91-130-2587131<br />
                        Fax: +91-130-3257840<br />
                        E-mail: JobNexus@naukri.com</p>
                </div>
            </div>
        </div>

    )
}

export default About