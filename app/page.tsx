import { SiteHeader } from "@/components/site-header"
import { HelpHero } from "@/components/help-hero"
import { ArticleCategories } from "@/components/article-categories"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />
      <HelpHero />
      <UpcomingEvents />
      <ArticleCategories />
    </main>
  )
}
