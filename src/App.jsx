import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import AppLayout from './Layout/AppLayout'
import LandingPage from './Pages/LandingPage'
import Onboarding from './Pages/Onboarding'
import JobListing from './Pages/JobListing'
import Jobs from './Pages/Jobs'
import MyJobs from './Pages/MyJobs'
import PostJobs from './Pages/PostJobs'
import SavedJobs from './Pages/SavedJobs'
import JobPage from './Pages/JobPage'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router =createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage />
      },
      {
        path:'/Onboarding',
        element:(
        <ProtectedRoute>
        <Onboarding />
        </ProtectedRoute>
        ),
      },

      //joblisting is jobs in video
      {
        path:'/JobListing',
        element:(
        <ProtectedRoute>
          <JobListing />
        </ProtectedRoute>
        )
      },

      //this is job page
      {
        path:'/Jobs/:id',
        element:(
        <ProtectedRoute>
        <Jobs />
        </ProtectedRoute>
        ),
      },
      {
        path:'/PostJobs',
        element: (
        <ProtectedRoute>
        <PostJobs />
        </ProtectedRoute>
        ),
      },
      {
        path:'/MyJobs',
        element:(
        <ProtectedRoute>
        <MyJobs />
        </ProtectedRoute>
        ),
      },
      {
        path:'/SavedJobs',
        element:(
        <ProtectedRoute>
        <SavedJobs />
        </ProtectedRoute>
        ),
      },
      {
        path:'/Job/:id',
        element:(
        <ProtectedRoute>
        <JobPage />
        </ProtectedRoute>
        ),
      },
    ]
  }
])


// have to create toogle btn for dark/light theme

function App() {
 

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  
      <RouterProvider router={router} />
  </ThemeProvider>
  )
}

export default App
