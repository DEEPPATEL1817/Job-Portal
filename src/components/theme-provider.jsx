import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey) ) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}









{/* <nav className='py-4 flex justify-between item-center'>
<Link>
    <img src="/logo.png" alt="Logo" className='h-20' />
</Link>

<div className='flex gap-8 items-center'>
    <SignedOut>
        <Button variant="outline" >Login</Button>
    </SignedOut>
    <SignedIn>
        {/* //here adding a condition if person is employer then and only then we will this icon Post a job  */}
//             <Button variant="outline" className="rounded-full">
//                 <PenBox size={20} className='mr-2' />
//                 Post a Job</Button>
//         <Link to="/PostJobs"></Link>

//         <UserButton />
//     </SignedIn>
// </div>
// </nav>
// {showSignIn && <div>
// <SignedIn 
// signUpforceRedirectUrl="/Onboarding"
// fallbackRedirectUrl="Onboarding"
// />
// </div> }  */}