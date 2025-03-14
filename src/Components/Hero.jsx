/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SplitText from "./SplitText";
import { useSpring, animated } from '@react-spring/web';

const FloatingShape = ({ className, delay }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const spring = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,30px,0)' },
        to: isVisible ? { opacity: 0.1, transform: 'translate3d(0,0,0)' } : { opacity: 0, transform: 'translate3d(0,30px,0)' },
        config: { tension: 280, friction: 60 }
    });

    return <animated.div className={className} style={spring} />;
};

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const mainSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 500
    });

    const buttonSpring = useSpring({
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: isVisible ? { opacity: 1, transform: 'scale(1)' } : { opacity: 0, transform: 'scale(0.9)' },
        delay: 1200,
        config: { tension: 280, friction: 60 }
    });

    return (
        <animated.div style={mainSpring} className='min-h-screen w-full flex flex-col justify-center items-center text-secondary relative bg-primary overflow-hidden pt-20'>
            {/* Decorative Shapes */}
            <FloatingShape className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent opacity-5 blur-3xl" delay={200} />
            <FloatingShape className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl" delay={400} />
            <FloatingShape className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent opacity-5 blur-3xl" delay={600} />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(117,46,204,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(117,46,204,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            <div className='z-10 flex flex-col justify-center items-center gap-y-8 px-4 max-w-full mx-auto text-center'>
                <div className="relative min-w-full">
                    <SplitText
                        text="Prarthan Parmar"
                        className="w-full text-xl md:text-7xl xl:text-8xl font-rocky text-secondary font-extralight mb-4"
                        delay={100}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-50px"
                    />
                    <div className="absolute -inset-1 bg-accent blur-2xl opacity-20 -z-10" />
                </div>

                <h2 className='font-firlest text-2xl md:text-3xl xl:text-5xl text-accent mb-8 relative'>
                    <span className="relative z-10">Web Developer</span>
                    <div className="absolute inset-0 bg-primary blur-sm -z-10" />
                </h2>
                
                <animated.a 
                    href="#hire" 
                    style={buttonSpring}
                    className='group relative px-8 py-4 bg-secondary text-primary rounded-full font-poppins text-lg hover:bg-accent transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-accent/20'
                >
                    <span className="relative z-10">Hire Me</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </animated.a>
            </div>
            
            <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-y-3'>
                <span className='text-secondary/80 text-sm font-poppins tracking-wider uppercase'>Scroll Down</span>
                <div className='w-8 h-14 border-2 border-secondary/40 rounded-full flex justify-center p-2 relative'>
                    <animated.div 
                        style={useSpring({
                            from: { transform: 'translateY(0px)' },
                            to: { transform: 'translateY(10px)' },
                            config: { duration: 1000 },
                            loop: { reverse: true }
                        })}
                        className='w-1.5 h-3 bg-accent rounded-full shadow-lg shadow-accent/20'
                    />
                </div>
            </div>
        </animated.div>
    );
};

export default Hero;