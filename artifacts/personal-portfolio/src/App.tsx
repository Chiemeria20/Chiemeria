import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import paperSculpture from './assets/editorial-paper.jpg';

const queryClient = new QueryClient();

const projectPlaceholders = [
  {
    number: '01',
    title: '[Project title]',
    summary:
      'A short account of the challenge, the people involved, and the change your work helped make possible.',
    tags: ['[Discipline]', '[Contribution]', '[Year]'],
  },
  {
    number: '02',
    title: '[Project title]',
    summary:
      'A concise story about a meaningful piece of work: what was unclear at first, and what became clearer.',
    tags: ['[Discipline]', '[Contribution]', '[Year]'],
  },
  {
    number: '03',
    title: '[Project title]',
    summary:
      'Use this space for a different kind of work, perspective, or collaboration worth remembering.',
    tags: ['[Discipline]', '[Contribution]', '[Year]'],
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="portfolio min-h-[100dvh]">
      <div className="shell">
        <header className="topbar" data-testid="header-portfolio">
          <a className="wordmark" href="#top" onClick={closeMenu} data-testid="link-home">
            <span className="mark" aria-hidden="true">Y</span>
            <span data-testid="text-name">[Your name]</span>
          </a>
          <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <a href="#story" onClick={closeMenu} data-testid="link-story">A little about me</a>
            <a href="#work" onClick={closeMenu} data-testid="link-work">Selected work</a>
            <a href="#approach" onClick={closeMenu} data-testid="link-approach">How I work</a>
            <a href="#contact" onClick={closeMenu} data-testid="link-contact-mobile">Get in touch</a>
          </nav>
          <a href="#contact" className="nav-contact" data-testid="link-contact-top">
            <span>Start a conversation</span>
            <span aria-hidden="true"><ArrowUpRight size={14} strokeWidth={1.6} /></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
      </div>

      <section className="shell hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-index eyebrow">
            <span className="live-dot" aria-hidden="true" />
            <span data-testid="text-location">[Location / time zone] · [Availability / collaboration status]</span>
          </div>
          <h1 id="hero-title" data-testid="text-hero-title">
            Make the
            <br />
            complex
            <br />
            feel <span className="serif">clear.</span>
          </h1>
          <p className="hero-sub" data-testid="text-hero-introduction">
            I’m <strong>[Your name]</strong>, a <strong>[your role or discipline]</strong>.
            I help people turn ambitious ideas into work that feels useful, considered,
            and unmistakably human.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button-primary" data-testid="link-explore-work">
              <span>Explore selected work</span>
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a href="#story" className="text-link" data-testid="link-read-story">
              <span>↓</span> A little about me
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Abstract paper sculpture in a palette of forest green and warm coral">
          <div className="hero-art">
            <img src={paperSculpture} alt="A tactile composition of folded paper forms in warm coral, pale green, and deep forest" />
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>THOUGHTFUL<br />BY DESIGN</span>
            <i>WORK IN PROGRESS</i>
          </div>
          <div className="visual-caption">
            <b>A note on the work</b>
            Ideas become more useful when they make room for people.
          </div>
        </div>
        <a href="#story" className="scroll-cue" aria-label="Scroll to the about section" data-testid="link-scroll-story">
          <span>Scroll to explore</span>
        </a>
      </section>

      <aside className="intro-band" aria-label="Portfolio introduction">
        <div className="shell intro-band-inner">
          <span className="eyebrow">A practice in progress</span>
          <p>Clear thinking. Generous collaboration. Work made to matter.</p>
        </div>
      </aside>

      <section className="shell section" id="story" aria-labelledby="story-title">
        <div className="section-heading reveal">
          <span className="section-number eyebrow">01 / The person behind the practice</span>
          <h2 className="section-title" id="story-title">
            Good work starts with <span className="serif">better questions.</span>
          </h2>
        </div>
        <div className="story-grid">
          <div className="reveal">
            <p className="story-lead">
              I’m drawn to the moment a complicated thing becomes <em>possible to understand.</em>
            </p>
            <div className="signature">[Your name]</div>
          </div>
          <div className="story-body reveal" data-testid="text-about-story">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>
              My work sits at the intersection of <strong>[your areas of practice]</strong>.
              I like finding the thread between what a team hopes to make and what people
              actually need from it.
            </p>
            <p>
              Over time, I’ve learned to value the unglamorous parts: listening closely,
              making the messy visible, and staying with a question long enough to find
              an answer worth building. This is where I’ll share a little more about the
              path that brought me here.
            </p>
            <p>
              Outside the work, I’m usually thinking about <strong>[something you’re curious
              about]</strong> — and how paying attention changes what we notice.
            </p>
            <div className="eyebrow">A point of view, still unfolding</div>
          </div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="section-heading reveal">
            <span className="section-number eyebrow">02 / Selected work</span>
            <h2 className="section-title" id="work-title">
              A few things I’ve <span className="serif">helped move forward.</span>
            </h2>
          </div>
          <p className="work-intro reveal">
            These spaces are ready for the projects that best show how you think, what you
            value, and the difference your contribution made.
          </p>
          <div className="project-list" data-testid="list-selected-work">
            {projectPlaceholders.map((project) => (
              <article className="project reveal" key={project.number} data-testid={`card-project-${project.number}`}>
                <span className="project-index">{project.number} /</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-tags" aria-label="Project details to personalize">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ArrowUpRight className="project-arrow" size={19} strokeWidth={1.4} aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="project-placeholder-note">
            <span>Replace each entry with a real project and your role in it.</span>
            <span>No client names or claims are assumed.</span>
          </div>
        </div>
      </section>

      <section className="shell section approach-section" id="approach" aria-labelledby="approach-title">
        <div className="section-heading reveal">
          <span className="section-number eyebrow">03 / How I work</span>
          <h2 className="section-title" id="approach-title">
            Thoughtful isn’t slow. It’s <span className="serif">intentional.</span>
          </h2>
        </div>
        <div className="approach-intro reveal">
          <p>
            The best process isn’t a performance. It is a way to make good decisions
            together, keep the important things in view, and leave room for the work
            to get better.
          </p>
        </div>
        <div className="principles">
          <article className="principle reveal">
            <span className="principle-label">01 — Begin</span>
            <h3>Find the real question.</h3>
            <p>Listen first. Make assumptions visible. Agree on what success should mean.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">02 — Make</span>
            <h3>Give ideas a shape.</h3>
            <p>Bring the right people into the room and make early thinking tangible.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">03 — Refine</span>
            <h3>Choose with care.</h3>
            <p>Use evidence and conversation to separate what is interesting from what is useful.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">04 — Finish</span>
            <h3>Leave things clearer.</h3>
            <p>Make the handoff thoughtful, the outcome understandable, and the next step easier.</p>
          </article>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="path-title">
        <div className="shell">
          <div className="section-heading reveal">
            <span className="section-number eyebrow">04 / A few chapters</span>
            <h2 className="section-title" id="path-title">
              The path, not just <span className="serif">the titles.</span>
            </h2>
          </div>
          <p className="timeline-note reveal">
            A little context for the work. Add the roles, places, and turning points that
            shaped the way you think today.
          </p>
          <div className="timeline">
            <article className="timeline-row reveal">
              <div className="timeline-date">[Year — Year]</div>
              <div>
                <div className="timeline-role">[Role or chapter]</div>
                <div className="timeline-org">[Organization or independent practice]</div>
              </div>
              <div className="timeline-context">[What you learned, made, or helped change.]</div>
            </article>
            <article className="timeline-row reveal">
              <div className="timeline-date">[Year — Year]</div>
              <div>
                <div className="timeline-role">[Role or chapter]</div>
                <div className="timeline-org">[Organization or independent practice]</div>
              </div>
              <div className="timeline-context">[A concise detail that gives this chapter meaning.]</div>
            </article>
            <article className="timeline-row reveal">
              <div className="timeline-date">[Earlier years]</div>
              <div>
                <div className="timeline-role">[A foundation worth mentioning]</div>
                <div className="timeline-org">[Study, training, or early experience]</div>
              </div>
              <div className="timeline-context">[The beginning of an interest that stayed with you.]</div>
            </article>
          </div>
          <div className="timeline-footer">
            <span>Keep this selective; a few meaningful chapters are enough.</span>
            <span>— END OF THE SHORT VERSION —</span>
          </div>
        </div>
      </section>

      <section className="shell contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-card reveal">
          <span className="contact-kicker eyebrow">05 / A good place to begin</span>
          <h2 id="contact-title">
            Have a thoughtful <span className="serif">thing in mind?</span>
          </h2>
          <div className="contact-bottom">
            <p>
              Tell me what you’re working through, where you hope to go, or simply what
              has caught your attention. I’d be glad to hear about it.
            </p>
            <a className="contact-link" href="mailto:hello@yourdomain.com" data-testid="link-send-email">
              <span>hello@[your-domain].com</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <span>© {new Date().getFullYear()} [Your name] · A practice in progress</span>
        <div className="footer-right">
          <a href="mailto:hello@yourdomain.com" data-testid="link-footer-email">Email</a>
          <span>[Location / time zone]</span>
          <a href="#top" className="back-top" data-testid="link-back-to-top">
            Back to the beginning <ArrowUp size={12} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;