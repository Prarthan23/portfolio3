/* eslint-disable react/prop-types */
import React from 'react';
import SplitText from './SplitText';
import { useSpring, animated } from '@react-spring/web';


import image1 from '/project1.png'
import image2 from '/project2.png'

const AnimatedSection = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef();

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const spring = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' },
        to: isVisible ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: 'translateY(50px)' },
        delay,
        config: { tension: 280, friction: 60 }
    });

    return (
        <animated.div ref={ref} style={spring}>
            {children}
        </animated.div>
    );
};

const ProjectCard = ({ title, description, technologies, imageUrl, demoUrl, sourceUrl, delay }) => {
    return (
        <AnimatedSection delay={delay}>
            <div className='bg-primary rounded-lg shadow-lg overflow-hidden'>
                <div className='aspect-video bg-gray-200'>
                    {/* Project image will go here */}
                    <div className='w-full h-full flex justify-center items-center bg-accent/20 p-4'>
                   <img src={imageUrl} className='w-[50%]'/> 
                    </div>
                </div>
                <div className='p-6'>
                    <h3 className='font-kanit text-xl text-secondary mb-3'>{title}</h3>
                    <p className='font-poppins text-secondary/80 mb-4'>{description}</p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {technologies.map((tech, index) => (
                            <span key={index} className='px-3 py-1 bg-secondary text-accent rounded-full text-sm font-poppins'>
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className='flex gap-4'>
                        {demoUrl && (
                            <a href={demoUrl} target='_blank' rel='noopener noreferrer' 
                            className='px-4 py-2 border border-secondary text-secondary rounded-md font-poppins hover:bg-secondary/10 transition-colors'>
                                Live Demo
                            </a>
                        )}
                        {sourceUrl && (
                            <a href={sourceUrl} target='_blank' rel='noopener noreferrer'
                               className='px-4 py-2 border border-secondary text-secondary rounded-md font-poppins hover:bg-secondary/10 transition-colors'>
                                Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Hospital Website',
            description: 'A cutting-edge, fully responsive platform built with React, designed to deliver a seamless user experience. It features an intuitive Online Booking System, an engaging Services Showcase, a detailed About Doctors section, and an insightful Blog Hub. Optimized for speed and accessibility, this platform ensures a smooth and efficient experience across all devices.',
            technologies: ['React', 'Framer-Motion', 'GSAP', 'Tailwind CSS'],
            imageUrl: image1,
            demoUrl: 'https://shraddhamulticarehospital.com/',
            
        },
        {
            title: 'Food Website',
            description: 'A visually appealing and fully responsive Food Website built to showcase all products from OGB India specializing in Bratwurst. Designed for a seamless browsing experience, the platform features high-quality product displays, detailed descriptions, and an intuitive navigation system. With optimized search and filtering options, customers can easily explore and purchase authentic bratwurst varieties.',
            technologies: ['React', 'Framer-Motion', 'Tailwind CSS'],
            imageUrl: image2,
            demoUrl: 'https://akassociates.co/',
           
        },
        // Add more projects as needed
    ];

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center py-20 bg-secondary'>
            <AnimatedSection>
                <div className='w-full max-w-4xl px-6 mb-12'>
                    <SplitText
                        text="My Projects"
                        className="font-rocky text-3xl mb-8 text-primary"
                        delay={50}
                        threshold={0.2}
                    />
                </div>
            </AnimatedSection>

            <div className='w-full max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        {...project}
                        delay={index * 200}
                    />
                ))}    
            </div>
        </div>
    );
};

export default Projects;