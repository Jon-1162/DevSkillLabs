"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  pricingPage?: boolean
}

export default function Header({ pricingPage = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasClerkKeys, setHasClerkKeys] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHasClerkKeys(true);
  }, []);

  return (
    <div className={`w-full py-6 fixed top-0 ${pricingPage ? "z-[0]" : "z-50"}`}>
      <div className="bg-primary w-[90%] mx-auto px-4 py-4 lg:py-8 flex justify-between items-center rounded-2xl">
        {/* Brand */}
        <Link href="/" className="text-2xl text-white font-bold transition-all duration-200">
          DevSkillSets
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Analytics
            </Link>
            {/* <Link 
              href="/pricing" 
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Pricing
            </Link> */}
          </nav>

          {/* Auth Buttons */}
          {isClient && hasClerkKeys ? (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-white hover:text-gray-300 transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-medium text-sm px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "shadow-xl border-0",
                      userButtonPopoverActionButton: "hover:bg-gray-100",
                    }
                  }}
                />
              </SignedIn>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* <Link 
                href="/pricing" 
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                Login
              </Link> */}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary w-[90%] mx-auto mt-2 rounded-2xl shadow-xl">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link 
              href="/" 
              className="block text-white hover:text-gray-300 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            {/* <Link 
              href="/pricing" 
              className="block text-white hover:text-gray-300 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link> */}
            {/* <Link 
              href="#about" 
              className="block text-white hover:text-gray-300 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link> */}
            {/* <Link 
              href="#contact" 
              className="block text-white hover:text-gray-300 transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link> */}

            {/* Mobile Auth Buttons */}
            {isClient && hasClerkKeys ? (
              <div className="pt-4 border-t border-white/20">
                <SignedOut>
                  <div className="space-y-3">
                    <SignInButton mode="modal">
                      <button className="w-full text-white hover:text-gray-300 transition-colors font-medium py-2 text-left">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-medium text-sm px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="pt-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "shadow-xl border-0",
                          userButtonPopoverActionButton: "hover:bg-gray-100",
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/20">
                {/* <Link 
                  href="/pricing" 
                  className="block text-white hover:text-gray-300 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
