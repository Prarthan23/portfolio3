import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';

const SocialLink = ({ href, icon: Icon, label }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const spring = useSpring({
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        config: { tension: 300, friction: 10 }
    });

    return (
        <animated.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-accent transition-colors duration-300"
            style={spring}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={label}
        >
            <Icon className="text-2xl" />
        </animated.a>
    );
};

const Footer = () => {
    const socialLinks = [
        {
            href: 'https://github.com/Prarthan23',
            icon: FaGithub,
            label: 'GitHub'
        },
        {
            href: 'https://www.linkedin.com/in/prarthan23/',
            icon: FaLinkedin,
            label: 'LinkedIn'
        },
        {
            href: 'https://wa.me/+918155849212',
            icon: FaWhatsapp,
            label: 'whatsapp'
        },
        {
            href: 'https://www.instagram.com/_prarthan_23/?igsh=MXUxdm04YzB4empjdA%3D%3D#',
            icon: FaInstagram,
            label: 'Instagram'
        }
    ];

    return (
        <footer className="w-full bg-primary py-8 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
                <div className="flex space-x-6">
                    {socialLinks.map((link, index) => (
                        <SocialLink key={index} {...link} />
                    ))}
                </div>
                
                <div className="text-center">
                    <p className="font-poppins text-secondary/80 text-sm">
                        © {new Date().getFullYear()} Prarthan Parmar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;