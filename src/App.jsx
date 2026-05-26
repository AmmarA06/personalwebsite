import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MinimalistCursor from "./components/MinimalistCursor";
import AsciiFlashlight from "./components/AsciiFlashlight";

function App() {
  const [lightMode, setLightMode] = useState(() => {
    const savedMode = localStorage.getItem("lightMode");
    return savedMode === "true";
  });

  const [expandedExps, setExpandedExps] = useState(new Set());

  const toggleExp = (index) => {
    setExpandedExps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const experiences = [
    {
      company: "Shopify",
      role: "Software Engineer Intern",
      logo: "/shopify-logo.png",
      link: "https://www.shopify.com/",
      date: "May 2026 - Aug 2026",
      description: "Summer 2026",
    },
    {
      company: "University of Toronto",
      role: "Undergraduate Research Assistant",
      logo: "/Utoronto_coa.svg.png",
      link: "https://marshtompsxd.github.io/",
      date: "Feb 2026 - Present",
      description: "Using formal verification to improve the reliability of distributed systems",
    },
    {
      company: "aUToronto",
      role: "Software Engineer",
      logo: "/autoronto.webp",
      link: "https://www.autodrive.utoronto.ca/",
      date: "Sep 2024 - Present",
      description: "Motion planning for autonomous vehicles",
    },
    {
      company: "Graycore",
      role: "Software Engineer Intern",
      logo: "/graycore-cube.svg",
      link: "https://graycore.io/",
      date: "May 2025 - Aug 2025",
      description: "Development frameworks and deployment infrastructure",
    },
    {
      company: "University of Waterloo",
      role: "Research Assistant",
      logo: "/University_of_Waterloo_seal.svg.png",
      link: "https://uwaterloo.ca/digital-intelligence-for-public-health/",
      date: "Oct 2023 - Jan 2024",
      description: "NLP and data analytics for public health surveillance",
    },
  ];

  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
    if (lightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [lightMode]);

  return (
    <>
      <AsciiFlashlight lightMode={lightMode} />
      <MinimalistCursor />
      <div className="min-h-screen px-6 py-8 md:py-12 flex items-start md:items-center justify-center bg-transparent transition-colors duration-300 dot-pattern relative z-20">
        <div data-content className="max-w-[500px] w-full min-h-[calc(100vh-4rem)] md:min-h-0 flex flex-col">
          <header className="mb-4 flex items-center justify-between">
            <a className="text-base font-medium hover-underline cursor-pointer underline-offset-8 text-neutral-100 light:text-neutral-900">
              Ammar Ahmad
            </a>
            <div className="flex items-center gap-6">
              <Link
                to="/projects"
                className="text-sm text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover-underline cursor-pointer underline-offset-8 transition-colors"
              >
                projects
              </Link>
              <button
                onClick={() => setLightMode(!lightMode)}
                className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors"
                aria-label="Toggle light mode"
              >
              {lightMode ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            </div>
          </header>

          <main className="space-y-2.5 text-sm leading-relaxed text-neutral-300 light:text-neutral-900">
            <div>
              <p>
                Studying Computer Engineering at{" "}
                <img
                  src="/Utoronto_coa.svg.png"
                  alt="UofT"
                  className="h-6 w-6 object-contain inline align-text-bottom"
                />{" "}
                <a
                  href="https://www.utoronto.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover-underline"
                >
                  University of Toronto
                </a>{" "}
                on a{" "}
                <a
                  href="https://schulichleaders.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover-underline"
                >
                  full-ride
                </a>
              </p>
            </div>

            <p className="font-medium text-neutral-100 light:text-neutral-900 pt-3">experience</p>
            <div className="space-y-1">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div
                    onMouseEnter={() => !expandedExps.has(index) && setExpandedExps((prev) => new Set(prev).add(index))}
                    onClick={() => toggleExp(index)}
                    className="flex items-center gap-3 py-1.5 cursor-pointer group"
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="h-9 w-9 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <a
                          href={exp.link}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-xs md:text-sm hover-underline text-neutral-100 light:text-neutral-900"
                        >
                          {exp.company}
                        </a>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 light:text-neutral-400 whitespace-nowrap">
                            {exp.date}
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${
                              expandedExps.has(index) ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-normal text-neutral-100 light:text-neutral-900 mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      expandedExps.has(index)
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-neutral-500 light:text-neutral-400 text-xs pb-2 ml-12 transition-opacity duration-500 ease-in-out ${
                        expandedExps.has(index) ? "opacity-100" : "opacity-0"
                      }`}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-medium text-neutral-100 light:text-neutral-900 pt-3">some projects</p>
            <div className="space-y-2">
              <div>
                <p>
                  <a
                    href="https://github.com/AmmarA06/Discovery/"
                    className="hover-underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discovery
                  </a>
                  <span className="text-neutral-500 light:text-neutral-400">{" "}real-time 3D object tracking with LiDAR and computer vision</span>
                </p>
              </div>
              <div>
                <p>
                  <a
                    href="https://tinyurl.com/2nc7tc9e"
                    className="hover-underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LookLock
                  </a>
                  <span className="text-neutral-500 light:text-neutral-400">{" "}gaze-tracking productivity app, interest from{" "}
                    <img
                      src="/snowflake-color.png"
                      alt="Snowflake"
                      className="h-4 w-4 object-contain inline align-text-bottom"
                    />{" "}
                    <a
                      href="https://www.snowflake.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-underline"
                    >
                      Snowflake
                    </a>
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <a
                    href="https://github.com/AmmarA06/Synthra/"
                    className="hover-underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Synthra
                  </a>
                  <span className="text-neutral-500 light:text-neutral-400">{" "}browser extension that turns pages into notes</span>
                </p>
              </div>
            </div>
          </main>

          <footer className="mt-auto pt-12 flex gap-5">
            <a
              href="https://github.com/AmmarA06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/ammar-ahmad06/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/ammarahmad06_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:ammarahmadwrk@gmail.com"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
