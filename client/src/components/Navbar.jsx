import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isAdmin, logout } = useAuth()
    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/works', label: 'Our Works' },
        { to: '/volunteer', label: 'Volunteer' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/contact', label: 'Contact' },
        { to: isAdmin ? '/admin' : '/admin-login', label: isAdmin ? 'Dashboard' : 'Admin' }
    ]

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur z-40 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <Logo className="w-10 h-10" />
                    <div className="text-lg font-semibold text-brand">ManavaSeva</div>
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-4 items-center">
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `group relative px-1 py-1 text-sm font-semibold tracking-wide transition-colors duration-200 ${isActive ? 'text-brand drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]' : 'text-gray-700 hover:text-brand/80'}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{label}</span>
                                    <span
                                        className={`pointer-events-none absolute left-0 right-0 -bottom-1 h-0.5 rounded-full transition-transform duration-300 origin-center ${isActive ? 'bg-brand scale-x-100' : 'bg-brand/40 scale-x-0 group-hover:scale-x-100'}`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                
                <div className="flex gap-2 items-center">
                    {isAdmin && (
                        <button
                            onClick={logout}
                            className="hidden md:inline-block px-3 py-2 border border-red-200 text-red-500 rounded-md text-sm font-semibold"
                        >
                            Logout
                        </button>
                    )}
                    <Link to="/volunteer" className="hidden md:inline-block px-4 py-2 bg-brand text-white rounded-md">Volunteer</Link>
                    <Link to="/donate" className="hidden md:inline-block px-4 py-2 border border-brand text-brand rounded-md">Donate</Link>
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden inline-flex flex-col gap-1.5 p-2"
                    >
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white/95">
                    <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) => `block px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isActive ? 'bg-brand text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {label}
                            </NavLink>
                        ))}
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    logout()
                                    setMobileMenuOpen(false)
                                }}
                                className="block w-full text-left px-4 py-2 border border-red-200 text-red-500 rounded-md text-sm font-semibold"
                            >
                                Logout
                            </button>
                        )}
                        <Link
                            to="/donate"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 border border-brand text-brand rounded-md text-center text-sm font-semibold"
                        >
                            Donate
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
