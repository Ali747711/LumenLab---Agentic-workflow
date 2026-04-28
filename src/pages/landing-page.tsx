import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { ProductTour } from "@/components/product-tour"
import { CustomerStory } from "@/components/customer-story"
import { Testimonials } from "@/components/testimonials"
import { Comparison } from "@/components/comparison"
import { Pricing } from "@/components/pricing"
import { FooterCTA } from "@/components/footer-cta"
import { SiteFooter } from "@/components/site-footer"

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <ProductTour />
        <CustomerStory />
        <Testimonials />
        <Comparison />
        <Pricing />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
