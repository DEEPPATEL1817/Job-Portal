import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // this is like global authentication which clerk provide in useUser
  //useUser will help to check if user is login or not ...if not it will open sign-in page

  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }



  //CHECKING ONBOARDING STATUS
  // const redirectwithAlert=()=>{
  //   alert("Please Select Your Role First")
  //   return <Navigate to="/Onboarding" />
  // }

  if (user !== undefined && !user?.unsafeMetadata?.role && pathname !== "/Onboarding") {

    alert("Please Select Role First");
    return <Navigate to="/Onboarding" />
  }

  return children;
}

export default ProtectedRoute