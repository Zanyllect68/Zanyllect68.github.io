import { LoadingScreen } from '@/components/loading-screen'
import { Navbar } from '@/components/navbar'
import { CommandPalette } from '@/components/command-palette'
import { ScrollProgress, BackToTop, CustomCursor } from '@/components/site-chrome'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Education } from '@/components/sections/education'
import { Certifications } from '@/components/sections/certifications'
import { Experience } from '@/components/sections/experience'
import { Projects } from '@/components/sections/projects'
import { Blog } from '@/components/sections/blog'
import { GithubSection } from '@/components/sections/github-section'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <Hero />
      <About />
      <Education />
      <Certifications />
      <Experience />
      <Projects />
      <Blog />
      <GithubSection />
      <CTA />
      <Footer />
      <BackToTop />
    </>
  )
}
