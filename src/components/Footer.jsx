"use client"

import Link from "next/link"

import { FaXTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
        
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-black text-white tracking-tight">
              Idea<span className="text-red-500">Vault</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The ultimate decentralised hub for entrepreneurs to secure, scale, and build global innovations.
            </p>
          </div>

          
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ideas" className="hover:text-red-400 transition-colors">Explore Ideas</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-red-400 transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/funding" className="hover:text-red-400 transition-colors">Seed Funding</Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-red-400 transition-colors">Workflow Challenges</Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-red-400 text-base flex-shrink-0" />
                <a href="mailto:support@ideavault.com" className="hover:text-white transition-colors">support@ideavault.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaLocationDot className="text-red-400 text-base flex-shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-red-400 text-base flex-shrink-0" />
                <a href="tel:+88012345678" className="hover:text-white transition-colors">+880 1234-567890</a>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <p className="text-sm text-slate-400 mb-4">Connect with our global tech pioneers.</p>
            <div className="flex space-x-3">
              
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 hover:bg-red-600 rounded-xl text-white text-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center">
                <FaXTwitter />
              </a>
            
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 hover:bg-red-600 rounded-xl text-white text-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center">
                <FaLinkedinIn />
              </a>
              
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 hover:bg-red-600 rounded-xl text-white text-lg transition-all transform hover:-translate-y-1 inline-flex items-center justify-center">
                <FaGithub />
              </a>
            </div>
          </div>

        </div>

      
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          
          
          <div>
            &copy; {currentYear} IdeaVault. All rights reserved.
          </div>
         
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}