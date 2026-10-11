import { CustomCursor } from './components/cursor/CustomCursor'
import { PageIntro } from './components/animations/PageIntro'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { EducationCerts } from './components/sections/EducationCerts'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { SkillConstellation } from './components/sections/SkillConstellation'
import { DarkGradientBg } from '@/components/ui/elegant-dark-pattern'
import { useGsapSectionReveal } from './hooks/useGsapSectionReveal'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis(true)
  useGsapSectionReveal('[data-gsap-reveal]')

  return (
    <DarkGradientBg>
      <PageIntro />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillConstellation />
        <Projects />
        <Experience />
        <EducationCerts />
        <Contact />
      </main>
      <Footer />
    </DarkGradientBg>
  )
}
