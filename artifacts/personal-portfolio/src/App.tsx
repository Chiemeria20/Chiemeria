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
import portraitPhoto from './assets/chiemeria-portrait.jpg';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    title: 'Student Crowdfunding Platform',
    visual: 'crowdfunding',
    bannerLabel: 'FINAL-YEAR TEAM PROJECT',
    bannerTitle: 'A platform built around student ideas.',
    summary:
      'A final-year team project for a student-focused crowdfunding platform. I led the UI/UX design, mapped key user flows, and worked with the development team as we built the product.',
    outcome:
      'Delivered the complete product design and contributed to a functional application presented as our final-year project.',
    tags: ['Product design', 'UI/UX', 'Team project'],
  },
  {
    number: '02',
    title: 'Car Spare Parts E-Commerce Platform',
    visual: 'ecommerce',
    bannerLabel: 'ND PROGRAM · TEAM PROJECT',
    bannerTitle: 'Car spare parts in an e-commerce concept.',
    summary:
      'A collaborative e-commerce project during my ND program. I contributed to developing the idea, shaping product direction, and designing the interface.',
    outcome:
      'Helped turn the initial concept into a functional e-commerce solution through collaborative design and development.',
    tags: ['Product development', 'UI/UX', 'E-commerce'],
  },
  {
    number: '03',
    title: 'Client Website UI/UX Redesign',
    visual: 'redesign',
    bannerLabel: 'CLIENT PROJECT · REDESIGN CONCEPT',
    bannerTitle: 'A clearer direction for a client website.',
    summary:
      'A client project focused on making a website cleaner, more engaging, and easier to use through a considered UI/UX redesign.',
    outcome:
      'Presented the redesign concept to the client and received positive feedback on the proposed direction.',
    tags: ['UI/UX design', 'Website redesign', 'Client project'],
  },
];

function ProjectBanner({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`project-banner project-banner-${project.visual}`} aria-hidden="true">
      <span className="project-banner-label">{project.bannerLabel}</span>
      <div className={`banner-art banner-art-${project.visual}`}>
        {project.visual === 'crowdfunding' && (
          <div className="funding-orbit">
            <span className="orbit-dot orbit-dot-one" />
            <span className="orbit-dot orbit-dot-two" />
            <span className="orbit-dot orbit-dot-three" />
            <span className="orbit-core">IDEA</span>
          </div>
        )}
        {project.visual === 'ecommerce' && (
          <div className="parts-composition">
            <span className="parts-gear parts-gear-large" />
            <span className="parts-gear parts-gear-small" />
            <span className="parts-card">AUTO<br />PARTS</span>
          </div>
        )}
        {project.visual === 'redesign' && (
          <div className="redesign-composition">
            <div className="redesign-window">
              <div className="redesign-window-bar"><i /><i /><i /></div>
              <div className="redesign-window-content">
                <span className="redesign-line redesign-line-short" />
                <span className="redesign-line" />
                <span className="redesign-line redesign-line-mid" />
              </div>
            </div>
            <span className="redesign-monogram">UI<br />UX</span>
          </div>
        )}
      </div>
      <span className="project-banner-title">{project.bannerTitle}</span>
    </div>
  );
}

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
            <span className="mark" aria-hidden="true">C</span>
            <span data-testid="text-name">Chiemeria</span>
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
            <span data-testid="text-location">Product design · Software &amp; web development · Lagos, Nigeria</span>
          </div>
          <h1 id="hero-title" data-testid="text-hero-title">
            Design for people.
            <br />
            Build for the
            <br />
            <span className="serif">real world.</span>
          </h1>
          <p className="hero-sub" data-testid="text-hero-introduction">
            I’m <strong>Chiemeria</strong>, a product designer and software &amp; web developer.
            I turn ideas and real-world problems into digital experiences that are purposeful,
            intuitive, and built to work.
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
        <div className="hero-visual" aria-label="Portrait of Chiemeria, product designer and software developer">
          <div className="hero-art">
            <img
              className="portrait-image"
              src={portraitPhoto}
              alt="Chiemeria, smiling outdoors in Lagos"
              width="1920"
              height="2560"
              fetchPriority="high"
            />
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>DESIGN<br />+ BUILD</span>
            <i>LAGOS, NIGERIA</i>
          </div>
          <div className="visual-caption">
            <b>Meet Chiemeria</b>
            Product design, software and web development.
          </div>
        </div>
        <a href="#story" className="scroll-cue" aria-label="Scroll to the about section" data-testid="link-scroll-story">
          <span>Scroll to explore</span>
        </a>
      </section>

      <aside className="intro-band" aria-label="Portfolio introduction">
        <div className="shell intro-band-inner">
          <span className="eyebrow">A practice in progress</span>
          <p>Thoughtful product design. Practical development. Experiences that work.</p>
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
              I bring design and development together to make digital products <em>clear, useful, and human.</em>
            </p>
            <div className="signature">Chiemeria</div>
          </div>
          <div className="story-body reveal" data-testid="text-about-story">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p>
              I’m a <strong>Product Designer and Software &amp; Web Developer</strong> who
              turns ideas and real-world problems into simple, purposeful digital experiences.
            </p>
            <p>
              Development taught me how products work behind the interface. Product design
              taught me to focus on the people using them. I bring both perspectives together
              to make solutions that are useful, intuitive, and technically realistic.
            </p>
            <p>
              I enjoy understanding how people think, simplifying complex problems, and
              transforming ideas into products that look good, feel natural, and actually work.
            </p>
            <p><strong>I don’t just design screens. I design experiences and build the systems behind them.</strong></p>
            <div className="eyebrow">What drives my work: technology should solve problems, not create more.</div>
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
            From a student crowdfunding platform to a client website redesign, each project
            brought product thinking and practical collaboration into the work.
          </p>
          <div className="project-list" data-testid="list-selected-work">
            {projects.map((project) => (
              <article className="project reveal" key={project.number} data-testid={`card-project-${project.number}`}>
                <ProjectBanner project={project} />
                <div className="project-content">
                  <span className="project-index">{project.number} /</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <p className="project-outcome"><strong>Outcome:</strong> {project.outcome}</p>
                    <div className="project-tags" aria-label={`${project.title} disciplines`}>
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <ArrowUpRight className="project-arrow" size={19} strokeWidth={1.4} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section approach-section" id="approach" aria-labelledby="approach-title">
        <div className="section-heading reveal">
          <span className="section-number eyebrow">03 / How I work</span>
          <h2 className="section-title" id="approach-title">
            Understand the problem. Make it <span className="serif">work for people.</span>
          </h2>
        </div>
        <div className="approach-intro reveal">
          <p>
            I start by understanding how people think and what is making a task harder than
            it needs to be. Then I simplify the experience and work toward a solution that
            feels natural and can be built with the technology available.
          </p>
        </div>
        <div className="principles">
          <article className="principle reveal">
            <span className="principle-label">01 — Understand</span>
            <h3>Start with the people.</h3>
            <p>Learn how people think, what they need, and where the real friction is.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">02 — Simplify</span>
            <h3>Make complexity clearer.</h3>
            <p>Turn broad ideas and difficult problems into focused product decisions.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">03 — Design</span>
            <h3>Make the experience feel natural.</h3>
            <p>Shape clear user flows and purposeful interfaces around what people need to do.</p>
          </article>
          <article className="principle reveal">
            <span className="principle-label">04 — Build</span>
            <h3>Keep it technically real.</h3>
            <p>Bring development thinking into the process so the solution can work beyond the screen.</p>
          </article>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="path-title">
        <div className="shell">
          <div className="section-heading reveal">
            <span className="section-number eyebrow">04 / A few chapters</span>
            <h2 className="section-title" id="path-title">
              A path shaped by <span className="serif">building.</span>
            </h2>
          </div>
          <p className="timeline-note reveal">
            My development background and design practice have grown together. Each gives me
            a different way to understand what makes a digital product useful.
          </p>
          <div className="timeline">
            <article className="timeline-row reveal">
              <div className="timeline-date">Foundation</div>
              <div>
                <div className="timeline-role">Software &amp; web development</div>
                <div className="timeline-org">Understanding how products work behind the interface</div>
              </div>
              <div className="timeline-context">A technical perspective that helps me think about how ideas can become working products.</div>
            </article>
            <article className="timeline-row reveal">
              <div className="timeline-date">Perspective</div>
              <div>
                <div className="timeline-role">Product design</div>
                <div className="timeline-org">Focusing on the people using the product</div>
              </div>
              <div className="timeline-context">A people-first way of finding where an experience can become clearer and easier to use.</div>
            </article>
            <article className="timeline-row reveal">
              <div className="timeline-date">Today</div>
              <div>
                <div className="timeline-role">Design + development</div>
                <div className="timeline-org">Product Designer and Software &amp; Web Developer</div>
              </div>
              <div className="timeline-context">Bringing both disciplines together to create digital experiences that are intuitive and technically realistic.</div>
            </article>
          </div>
          <div className="timeline-footer">
            <span>Design for people. Build to solve real problems.</span>
            <span>— ALWAYS LEARNING —</span>
          </div>
        </div>
      </section>

      <section className="shell contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-card reveal">
          <span className="contact-kicker eyebrow">05 / A good place to begin</span>
          <h2 id="contact-title">
            Have a real problem <span className="serif">to solve?</span>
          </h2>
          <div className="contact-bottom">
            <p>
              If you’re working on a digital product and need thoughtful design, practical
              development, or both, I’d be glad to hear what you have in mind.
            </p>
            <a className="contact-link" href="mailto:darafavour18@gmail.com" data-testid="link-send-email">
              <span>darafavour18@gmail.com</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              className="contact-link social-contact-link"
              href="https://www.linkedin.com/in/favour-dara-074a942ba"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="shell footer">
        <span>© {new Date().getFullYear()} Chiemeria · Lagos, Nigeria</span>
        <div className="footer-right">
          <a href="mailto:darafavour18@gmail.com" data-testid="link-footer-email">Email</a>
          <a
            href="https://www.linkedin.com/in/favour-dara-074a942ba"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-footer-linkedin"
          >
            LinkedIn
          </a>
          <span>Lagos, Nigeria</span>
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