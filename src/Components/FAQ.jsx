import React, { useState } from 'react';
import SplitText from './SplitText';
import { useSpring, animated } from '@react-spring/web';
import { FaChevronDown } from 'react-icons/fa';

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

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const contentProps = useSpring({
        from: { opacity: 0, maxHeight: 0, transform: 'translateY(-20px)' },
        to: {
            opacity: isOpen ? 1 : 0,
            maxHeight: isOpen ? 1000 : 0,
            transform: `translateY(${isOpen ? 0 : -20}px)`
        },
        config: { tension: 280, friction: 60 }
    });

    const iconProps = useSpring({
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    });

    return (
        <div className="border-b border-secondary/20">
            <button
                className="w-full py-4 px-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-kanit text-lg text-primary group-hover:text-accent transition-colors">
                    {question}
                </span>
                <animated.span style={iconProps}>
                    <FaChevronDown className="text-primary group-hover:text-accent transition-colors" />
                </animated.span>
            </button>
            <animated.div style={contentProps}>
                <div className="px-6 pb-4">
                    <p className="font-poppins text-primary/80">{answer}</p>
                </div>
            </animated.div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "What services do you provide?",
            answer: "I specialize in Frontend Development, UI/UX Design Implementation, API Integration, Performance Optimization, Responsive Web Design, and Web Animation. Each service is tailored to meet your specific project needs."
        },
        {
            question: "What is your development process?",
            answer: "My development process involves understanding your requirements, creating wireframes and prototypes, implementing the design with clean code, thorough testing, and continuous communication throughout the project lifecycle."
        },
        {
            question: "How long does a typical project take?",
            answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while more complex applications could take 2-3 months. I'll provide a detailed timeline after understanding your specific requirements."
        },
        {
            question: "Do you provide ongoing support after project completion?",
            answer: "Yes, I offer post-launch support and maintenance services to ensure your website continues to perform optimally. This includes bug fixes, updates, and performance monitoring."
        },
        {
            question: "What technologies do you work with?",
            answer: "I primarily work with React.js, along with modern frontend technologies like Tailwind CSS, GSAP, and Framer Motion for animations. I'm also experienced with the MERN stack for full-stack development."
        },
        {
            question: "How do you handle project communication?",
            answer: "I maintain regular communication through email, video calls, and project management tools. You'll receive weekly progress updates and have direct access to me for any questions or concerns."
        }
    ];

    return (
        <div className="min-h-screen w-full bg-secondary py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <AnimatedSection>
                    <div className="mb-12 space-y-8">
                        <SplitText
                            text="Frequently Asked Questions"
                            className="font-rocky text-xl xl:text-3xl text-primary mb-4"
                            delay={50}
                            threshold={0.2}
                        />
                        <p className="font-poppins text-primary/80 text-lg">
                            Find answers to common questions about my services and work process.
                        </p>
                    </div>
                </AnimatedSection>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AnimatedSection key={index} delay={index * 100}>
                            <FAQItem {...faq} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;