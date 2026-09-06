import { ScrollReveal } from './ScrollReveal';

export function SectionIntro() {
  return (
    <section className="section-intro" id="features">
      <ScrollReveal className="section-intro__grid">
        <h2>
          A weekend planner's
          <br />
          favorite <span className="accent-serif">toolkit</span>
        </h2>
        <p>
          See every option at a glance, shortlist the ones that click, and land on a plan without
          twenty browser tabs. Escape keeps the whole decision in one calm, visual place.
        </p>
      </ScrollReveal>
    </section>
  );
}
