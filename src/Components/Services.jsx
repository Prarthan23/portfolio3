import React from 'react';
import SplitText from './SplitText';
import { useSpring, animated } from '@react-spring/web';
import { FaReact, FaPaintBrush, FaCode, FaRocket, FaMobile, FaMagic } from 'react-icons/fa';

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

const ServiceCard = ({ title, description, delay, icon: Icon }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardSpring = useSpring({
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        config: { tension: 300, friction: 20 }
    });

    return (
        <AnimatedSection delay={delay}>
            <animated.div
                className='relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 rounded-xl p-6 group'
                style={cardSpring}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent'></div>
                <div className='flex items-center mb-4'>
                    <Icon className='text-4xl text-accent mr-3' />
                    <h3 className='font-kanit text-xl text-primary'>{title}</h3>
                </div>
                <p className='font-poppins text-primary/80 group-hover:text-primary transition-colors duration-300'>
                    {description}
                </p>
                <div className='absolute bottom-0 right-0 w-20 h-20 bg-accent/5 rounded-tl-full transform translate-x-10 translate-y-10'></div>
            </animated.div>
        </AnimatedSection>
    );
};

const Services = () => {
    const services = [
        {
            title: 'Frontend Development',
            description: 'Building responsive and interactive user interfaces using modern frameworks like React.js. Creating seamless user experiences with clean and efficient code.',
            icon: FaReact
        },
        {
            title: 'UI/UX Design Implementation',
            description: 'Transforming design mockups into pixel-perfect websites. Implementing modern design principles and ensuring consistent branding across all pages.',
            icon: FaPaintBrush
        },
        {
            title: 'API Integration',
            description: 'Connecting frontend applications with backend services through RESTful APIs. Implementing secure data handling and real-time updates.',
            icon: FaCode
        },
        {
            title: 'Performance Optimization',
            description: 'Optimizing website performance for faster load times. Implementing best practices for SEO and ensuring cross-browser compatibility.',
            icon: FaRocket
        },
        {
            title: 'Responsive Web Design',
            description: 'Creating websites that work flawlessly across all devices and screen sizes. Implementing mobile-first design principles for optimal user experience.',
            icon: FaMobile
        },
        {
            title: 'Web Animation',
            description: 'Implementing smooth and engaging animations using modern technologies. Creating interactive elements that enhance user engagement and website aesthetics.',
            icon: FaMagic
        }
    ];

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center py-20 bg-primary'>
            <AnimatedSection>
                <div className='w-full max-w-4xl px-6 mb-12'>
                    <SplitText
                        text="Services I Provide"
                        className="font-kanit text-3xl mb-8 text-secondary"
                        delay={50}
                        threshold={0.2}
                    />
                </div>
            </AnimatedSection>

            <div className='w-full max-w-[80%] px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        {...service}
                        delay={index * 100}
                    />
                ))}
            </div>
        </div>
    );
};

export default Services;