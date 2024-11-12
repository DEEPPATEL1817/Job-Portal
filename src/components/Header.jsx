import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BookmarkIcon, BriefcaseBusiness, BriefcaseBusinessIcon, PenBox } from 'lucide-react'


const Header = () => {

    const [showSignIn, setShowSignIn] = useState(false);
    

    //this will redirect to signin page
    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    useEffect(() => {
        if (search.get("sign-in")) {
            setShowSignIn(true);
            setSearch({});
        }
    }, [search]);



    const handleLayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
        }
    };

    return (
        <>
            <nav className='py-4 flex justify-between item-center'>
                <Link>
                    <img src="/logo.png" alt="Logo" className='h-20' />
                </Link>

                <div className='flex gap-8 items-center'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
                    </SignedOut>
                    <SignedIn>
                        {user?.unsafeMetadata?.role==="recruiter" && (
                        <Link to="/PostJobs">
                        <Button variant="secondary" className="rounded-full">
                            <PenBox size={20} className='mr-2' /> Post a Job
                        </Button>
                        </Link>
                    )}
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                            }
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Job'
                                    labelIcon={<BriefcaseBusiness size={15} />}
                                    href='/MyJobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<BookmarkIcon size={15} />}
                                    href='/SavedJobs'
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>
            {showSignIn && (
                <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center"
                    onClick={handleLayClick}
                //this handleclick will allow to remove authentication box of clerk
                >
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    )
}

export default Header