"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation" 
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon, ChevronDown, LogOut, User, Lightbulb, MessageSquare, PlusCircle, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client" 

export default function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const pathname = usePathname()
  const router = useRouter() 
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

 
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setShowDropdown(false)
          setIsOpen(false)
          router.push('/login')
        }
      }
    })
  }

  const getLinkClass = (path) => {
    const baseClass = "px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    return pathname === path
      ? `${baseClass} bg-red-50 dark:bg-slate-900 text-red-600 dark:text-indigo-400 font-bold`
      : `${baseClass} text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900`
  }

  return (
    <nav className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-black bg-gradient-to-r from-red-600 to-violet-500 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">
              IdeaVault //
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <Link href="/" className={getLinkClass("/")}>Home</Link>
            <Link href="/ideas" className={getLinkClass("/ideas")}>Ideas</Link>
            <Link href="/add-idea" className={getLinkClass("/add-idea")}>Add Idea</Link>
            <Link href="/my-ideas" className={getLinkClass("/my-ideas")}>My Ideas</Link>
            <Link href="/my-interactions" className={getLinkClass("/my-interactions")}>My Interactions</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:scale-105 transition-all min-w-[34px] min-h-[34px] flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-[18px] h-[18px]" />
              ) : theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {isPending ? (
              <Loader2 className="animate-spin text-slate-400" size={20} />
            ) : session ? (
              
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm overflow-hidden">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {session.user.name || "User Name"}
                      </p>
                    </div>
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <User size={16} />
                      <span>Profile Management</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors border-t border-slate-100 dark:border-slate-800 mt-1"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              
              <div className="flex items-center space-x-2">
                <Link href="/login" className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-red-600 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 rounded-xl transition-all">
                  Register
                </Link>
              </div>
            )}

          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-w-[34px] min-h-[34px] flex items-center justify-center"
            >
              {!mounted ? (
                <div className="w-[18px] h-[18px]" />
              ) : theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1 shadow-lg transition-colors duration-300">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">Home</Link>
          <Link href="/ideas" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">Ideas</Link>
          <Link href="/add-idea" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
            <PlusCircle size={18} /> <span>Add Idea</span>
          </Link>
          <Link href="/my-ideas" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
            <Lightbulb size={18} /> <span>My Ideas</span>
          </Link>
          <Link href="/my-interactions" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
            <MessageSquare size={18} /> <span>My Interactions</span>
          </Link>

          {isPending ? (
            <div className="py-2.5 flex justify-center"><Loader2 className="animate-spin text-slate-400" size={20} /></div>
          ) : session ? (
            
            <>
              <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-900 mt-2">
                <User size={18} /> <span>Profile Management ({session.user.name})</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-lg text-base font-medium text-rose-600 dark:text-rose-400 text-left hover:bg-rose-50 dark:hover:bg-rose-950/20"
              >
                <LogOut size={18} /> <span>Logout</span>
              </button>
            </>
          ) : (
            
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-900">
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                Login
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="text-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}