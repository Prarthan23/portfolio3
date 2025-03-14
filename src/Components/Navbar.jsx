import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const NavLink = ({ children, href, onClick, className, isMobile }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const spring = useSpring({
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        config: { tension: 300, friction: 10 }
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <animated.a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`${isMobile ? 'text-primary' : isScrolled ? 'text-primary' : 'text-secondary'} hover:text-accent transition-colors duration-300 font-poppins ${className}`}
            style={spring}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </animated.a>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = element.offsetTop - 100;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navSpring = useSpring({
        from: { opacity: 0, transform: 'translateY(-100%)' },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
            backgroundColor: isScrolled ? 'rgb(255, 255, 255)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none'
        },
        config: { tension: 280, friction: 60 }
    });

    const mobileMenuSpring = useSpring({
        transform: isMobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
        opacity: isMobileMenuOpen ? 1 : 0,
        config: { tension: 280, friction: 60 }
    });

    return (
        <animated.nav
            className="fixed top-0 left-0 w-full z-50 py-4 px-6"
            style={navSpring}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <a href="#" className={`${isScrolled ? 'text-primary' : 'text-secondary'} hover:text-accent transition-colors duration-300 font-kanit text-2xl`}>
                    Best Web Developer
                </a>

                <div className={`hidden md:flex space-x-8`}>
                    <NavLink href="#about" onClick={() => scrollToSection('about')}>
                        About
                    </NavLink>
                    <NavLink href="#services" onClick={() => scrollToSection('services')}>
                        Services
                    </NavLink>
                    <NavLink href="#projects" onClick={() => scrollToSection('projects')}>
                        Projects
                    </NavLink>
                    <NavLink href="#hire" onClick={() => scrollToSection('hire')}>
                        Hire Me
                    </NavLink>
                    <NavLink href="#faq" onClick={() => scrollToSection('faq')}>
                        FAQ
                    </NavLink>
                </div>

                <button 
                    className={`md:hidden ${isScrolled ? 'text-primary' : 'text-secondary'} hover:text-accent transition-colors duration-300 z-50`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu */}
                <animated.div 
                    style={mobileMenuSpring}
                    className="fixed top-0 right-0 h-screen w-64 bg-white text-primary backdrop-blur-lg shadow-lg md:hidden flex flex-col items-center justify-center space-y-8 p-6"
                >
                    <NavLink href="#about" onClick={() => scrollToSection('about')} isMobile={true}>
                        About
                    </NavLink>
                    <NavLink href="#services" onClick={() => scrollToSection('services')} isMobile={true}>
                        Services
                    </NavLink>
                    <NavLink href="#projects" onClick={() => scrollToSection('projects')} isMobile={true}>
                        Projects
                    </NavLink>
                    <NavLink href="#hire" onClick={() => scrollToSection('hire')} isMobile={true}>
                        Hire Me
                    </NavLink>
                    <NavLink href="#faq" onClick={() => scrollToSection('faq')} isMobile={true}>
                        FAQ
                    </NavLink>
                </animated.div>
            </div>
        </animated.nav>
    );
};

export default Navbar;