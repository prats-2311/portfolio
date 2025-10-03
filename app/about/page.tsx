import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Prateek Srivastava - Software Developer Journey",
  description:
    "Learn about Prateek Srivastava's journey as a Software Developer, from intern at Sugoi Labs to current role at Amino Technology Limited. 3+ years of experience in Angular, Next.js, Python, and payment systems.",
  keywords: [
    "Prateek Srivastava about",
    "Prateek Srivastava biography",
    "Software Developer journey",
    "Amino Technology Limited developer",
    "Angular developer career",
    "Next.js developer experience",
  ],
  openGraph: {
    title: "About Prateek Srivastava - Software Developer Journey",
    description:
      "Learn about Prateek Srivastava's journey as a Software Developer, from intern at Sugoi Labs to current role at Amino Technology Limited.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Prateek Srivastava
          </h1>
          <p className="text-xl text-muted-foreground">
            Software Developer | Angular, Next.js & Python Expert
          </p>
        </header>

        <article className="prose prose-lg max-w-none dark:prose-invert">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Professional Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm Prateek Srivastava, a passionate Software Developer with over
              3 years of professional experience in building scalable web
              applications and innovative digital solutions. Currently working
              at Amino Technology Limited in Delhi, India, where I specialize in
              developing high-performance applications using Angular, Next.js,
              and Python.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              My journey in software development began during my internship at
              Sugoi Labs in Bangalore, where I worked on logistics optimization
              projects and contributed to systems serving 500+ daily users. This
              experience laid the foundation for my expertise in backend
              development and system optimization.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Current Role & Achievements
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Amino Technology Limited, I've been instrumental in developing
              reusable Angular components that reduced development time by 40%
              and building payment gateway infrastructure handling 1000+ daily
              transactions with 99.9% uptime. I've also designed company
              websites using Next.js, achieving 95+ Lighthouse performance
              scores and improving page load speeds by 60%.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              One of my key contributions has been creating specialized APIs
              that improved ERP software performance by 35%, reducing response
              times from 2 seconds to 0.7 seconds. This work demonstrates my
              commitment to performance optimization and user experience
              enhancement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My technical stack includes Angular, React, Next.js, Python,
              TypeScript, JavaScript, and Node.js. I have extensive experience
              with payment gateway integrations, ERP system development, and
              building scalable web applications that serve thousands of users
              daily.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm particularly passionate about creating efficient, maintainable
              code and implementing best practices that improve both developer
              experience and end-user satisfaction. My work consistently focuses
              on performance optimization, security, and scalability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm always interested in discussing new opportunities,
              collaborating on innovative projects, or sharing knowledge about
              software development. Feel free to reach out through my
              <a
                href="https://www.linkedin.com/in/prateek-srivastava-44b37910b"
                className="text-primary hover:underline mx-1"
              >
                LinkedIn
              </a>
              or check out my projects on
              <a
                href="https://github.com/prats-2311"
                className="text-primary hover:underline mx-1"
              >
                GitHub
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
