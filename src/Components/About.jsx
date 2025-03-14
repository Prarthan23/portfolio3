/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import SplitText from './SplitText';
import { useSpring, animated } from '@react-spring/web';

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

const About = () => {
    return (
        <div className='min-h-[100vh] w-full flex flex-col justify-start items-center gap-y-16 py-16 bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90 text-primary relative overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2'></div>
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2'></div>

            {/* Introduction Section */}
            <AnimatedSection>
                <div className='w-full max-w-4xl px-6 space-y-6 relative'>
                    <div className='absolute top-0 left-0 w-20 h-1 bg-gradient-to-r from-accent to-transparent'></div>
                    <SplitText
                        text="About Me"
                        className="font-rocky text-3xl mb-8 text-accent"
                        delay={50}
                        threshold={0.2}
                    />
                    <p className='font-kanit text-xl text-justify leading-relaxed bg-primary/5 p-6 rounded-lg backdrop-blur-sm border border-primary/10 shadow-lg'>
                        &quot;I'm Prarthan Parmar, a passionate Frontend Developer specializing in React.js and the MERN stack. With experience in building interactive and user-friendly web applications, I aim to create seamless digital experiences.&ldquo;
                    </p>
                </div>
            </AnimatedSection>

            {/* Education Section */}
            <AnimatedSection delay={200}>
                <div className='w-full max-w-4xl px-6 space-y-6'>
                    <SplitText
                        text="Education"
                        className="font-rocky text-3xl mb-8 text-accent"
                        delay={50}
                        threshold={0.2}
                    />
                    <div className='space-y-6'>
                        <div className='group bg-primary/5 p-6 rounded-lg backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <div className='relative z-10'>
                                <h3 className='font-kanit text-2xl mb-3 group-hover:text-accent transition-colors'>Bachelor of Engineering in Computer Engineering</h3>
                                <p className='text-xl mt-2 font-poppins text-primary/90'>Gujarat Technological University</p>
                                <p className='text-lg opacity-80 font-poppins mt-2'>2020 - 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Experience Section */}
            <AnimatedSection delay={400}>
                <div className='w-full max-w-4xl px-6 space-y-6'>
                    <SplitText
                        text="Experience"
                        className="font-rocky text-3xl mb-8 text-accent"
                        delay={50}
                        threshold={0.2}
                    />
                    <div className='space-y-6'>
                        <div className='group bg-primary/5 p-8 rounded-lg backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <div className='relative z-10'>
                                <h3 className='font-kanit text-2xl mb-3 group-hover:text-accent transition-colors'>Web Developer</h3>
                                <p className='text-xl mt-2 font-poppins text-primary/90'>Akavn Solutech LLP</p>
                                <p className='text-lg opacity-90 font-poppins mt-2 mb-4'>October 2024 - Present</p>
                                <ul className='space-y-3 font-poppins text-lg'>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-accent rounded-full mr-3'></span>
                                        Developed responsive web applications using React.js
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-accent rounded-full mr-3'></span>
                                        Collaborated with senior developers on client projects
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-accent rounded-full mr-3'></span>
                                        Implemented modern UI/UX design principles
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
};

export default About;