import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
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
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboard",
        element:<Onboard />
      },
      {
        path: "/jobs",
        element:<JobListing />  
      },
      {
        path: "/post-job",
        element:<PostJob />
        
      },
      {
        path: "/my-jobs",
        element: <MyJobs />
          
      },
      {
        path: "/saved-jobs",
        element:<SaveJob />
          
      },
      {
        path: "/job/:id",
        element:<Job />
         
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;














