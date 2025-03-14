// eslint-disable-next-line no-unused-vars
import React from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import About from './Components/About'
import Projects from './Components/Projects'
import FAQ from './Components/FAQ'
import Lenis from 'lenis'
import Hire from './Components/Hire'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
const App = () => {
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


  return (
    <div className='min-h-screen w-full flex flex-col justify-start items-center bg-primary'>
        <Navbar />
        <main className='w-full'>
          <section id="home"><Hero/></section>
          <section id="about"><About/></section>
          <section id="services"><Services/></section>
          <section id="projects"><Projects/></section>
          <section id="hire"><Hire/></section>
          <section id="faq"><FAQ/></section>
        </main>
        <Footer/>
    </div>
  )
}

export default App