import { Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import MinimalistCursor from "./components/MinimalistCursor";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode !== null ? savedMode === "true" : true;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <MinimalistCursor />
      <div className="min-h-screen px-6 py-8 md:py-12 flex items-start md:items-center justify-center bg-stone-50 dark:bg-neutral-900 transition-colors duration-300">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <header className="mb-10 flex items-center justify-between">
            <h1 className="text-2xl font-medium underline underline-offset-8 dark:text-neutral-100">
              Ammar Ahmad
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
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
              ) : (
                <svg
                  className="w-5 h-5"
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
              )}
            </button>
          </header>

          {/* Main Content */}
          <main className="space-y-2.5 text-base leading-relaxed dark:text-neutral-300">
            <div className="flex items-start gap-3">
              <span className="text-neutral-400 mt-0.5">➣</span>
              <div className="flex items-center gap-2">
                <img
                  src="/Utoronto_coa.svg.png"
                  alt="UofT"
                  className="h-10 w-10 object-contain"
                />
                <p>
                comp eng at{" "}
                  <a
                    href="https://www.utoronto.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover-underline"
                  >
                    University of Toronto
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-neutral-400 mt-0.5">➣</span>
              <div className="flex items-center gap-2">
                <img
                  src="/autoronto.webp"
                  alt="aUToronto"
                  className="h-10 w-10 object-contain"
                />
                <p>
                  Software Developer at{" "}
                  <a
                    href="https://www.autodrive.utoronto.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover-underline"
                  >
                    aUToronto
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-neutral-400 mt-0.5">➣</span>
              <div>
                <p className="mb-2">previous...</p>
                <div className="ml-5 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-0.5">→</span>
                    <div className="flex items-center gap-2">
                      <img
                        src="/graycore-cube.svg"
                        alt="Graycore"
                        className="h-6 w-6 object-contain"
                      />
                      <p>
                        SWE Intern at{" "}
                        <a
                          href="https://graycore.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover-underline"
                        >
                          Graycore
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-0.5">→</span>
                    <div className="flex items-center gap-2">
                      <img
                        src="/University_of_Waterloo_seal.svg.png"
                        alt="UWaterloo"
                        className="h-6 w-6 object-contain"
                      />
                      <p>
                        Student Researcher at{" "}
                        <a
                          href="https://uwaterloo.ca/digital-intelligence-for-public-health/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover-underline"
                        >
                          UWaterloo
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-neutral-400 mt-0.5">➣</span>
              <div>
                <p className="mb-2">what i've built...</p>
                <div className="ml-5 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-0.5">→</span>
                    <p>
                      an{" "}
                      <a
                        href="https://github.com/AmmarA06/Synthra/"
                        className="hover-underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        intelligent browser extension
                      </a>{" "}
                      that transforms webpages into notes
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-0.5">→</span>
                    <p>
                      a{" "}
                      <a
                        href="https://tinyurl.com/2nc7tc9e"
                        className="hover-underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        productivity app
                      </a>{" "}
                      that tracks gaze to improve concentration (interest from{" "}
                      <img
                        src="/snowflake-color.png"
                        alt="Snowflake"
                        className="h-5 w-5 object-contain inline align-text-bottom"
                      />{" "}
                      <a
                        className="hover-underline font-medium"
                        href="https://www.snowflake.com/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Snowflake
                      </a>
                      )
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-neutral-300 mt-0.5">→</span>
                    <p>
                      a{" "}
                      <a
                        href="https://github.com/AmmarA06/CodeType/"
                        className="hover-underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Monkeytype-styled app,
                      </a>{" "}
                      but for programming languages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer/Social Links */}
          <footer className="mt-12 flex gap-5">
            <a
              href="https://github.com/AmmarA06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:scale-110 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/ammar-ahmad06/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/ammarahmad06_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:scale-110 transition-all duration-200"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:ammarahmadwrk@gmail.com"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:scale-110 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
