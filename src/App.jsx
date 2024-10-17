import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from '../layout/Applayout';
import LandingPage from '../pages/LandingPage';
import Onboard from '../pages/Onboard';
import SaveJob from '../pages/SaveJob';
import MyJobs from '../pages/myJobs';
import JobListing from '../pages/jobListing';
import PostJob from '../pages/postJob';
import Job from '../pages/job';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/Onboard',
        element: <Onboard />
      },
      {
        path: '/SaveJob',
        element: <SaveJob />
      },
      {
        path: '/MyJobs',
        element: <MyJobs/>
      },
      {
        path: '/JobListing',
        element: <JobListing />
      },
      {
        path: '/PostJob',
        element: <PostJob />
      },
      {
        path: '/Job',
        element: <Job />
      },

    ]
  },
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
