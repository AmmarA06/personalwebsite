import { Github, Linkedin, Mail, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MinimalistCursor from "../components/MinimalistCursor";

function Projects() {
  const [lightMode, setLightMode] = useState(() => {
    const savedMode = localStorage.getItem("lightMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
    if (lightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [lightMode]);
  const projects = [
    {
      title: "Shop3D",
      description: "a Shopify app that turns product images into interactive 3D models. Customers can rotate, zoom, and inspect products directly on your store. Uses TripoSR for model generation and React Three Fiber for smooth 3D visualization.",
      tags: ["Shopify API", "Ruby on Rails", "GraphQL", "FastAPI", "three.js", "Celery", "TripoSR", "Redis", "SQL"],
      media: "/videos/shopify-3d-viewer.mp4",
      mediaType: "video",
      playbackSpeed: 1.5,
      github: "https://github.com/AmmarA06/Shop3D/",
      link: null
    },
    {
      title: "Synthra",
      description:
        "an intelligent browser extension that transforms webpages into notes.",
      tags: ["Chrome Extension", "Gemini", "Notion API"],
      media: "/videos/Synthra_clip_edited.mp4", 
      mediaType: "video", 
      playbackSpeed: 1.5, 
      github: "https://github.com/AmmarA06/Synthra/",
      link: null,
    },
    {
      title: "Rift Rewind",
      description: "a league year-in-review that blends data visualization, coaching, and celebration, highlighting progress and guiding next steps for improvement.",
      tags: ["React", "AWS", "Bedrock", "Flask", "D3.js", "Riot API"],
      media: "/videos/riftrewind_demo.mp4",
      mediaType: "video",
      playbackSpeed: 1.5,
      github: "https://github.com/KenC2006/Rift_Rewind/",
      link: "https://rift-rewind-kohl.vercel.app/",
    },
    {
      title: "LookLock",
      description:
        "a productivity app that tracks gaze to improve concentration, interest from Snowflake.",
      tags: ["Streamlit", "OpenCV",],
      media: "projectimages/looklock.png",
      mediaType: "image",
      playbackSpeed: 1.0,
      github: null,
      link: "https://tinyurl.com/2nc7tc9e",
    },
    {
      title: "CodeType",
      description:
        "a Monkeytype-styled app, but for programming languages.",
      tags: ["React", "TypeScript", "Vite", "Supabase"],
      media: ["/projectimages/codetype.png"], 
      mediaType: "image",
      playbackSpeed: 1.0,
      github: "https://github.com/AmmarA06/CodeType/",
      link: null,
    },
    {
      title: "BiasBreaker",
      description: "search for any news topic and receive a multi-perspective summary.",
      tags: ["React", "three.js", "FastAPI", "Cohere", "Beautiful Soup", "Next.js", "Supabase"],
      media: "/projectimages/biasbreaker.png",
      mediaType: "image",
      playbackSpeed: 1.0,
      github: "https://github.com/AmmarA06/BiasBreaker/",
      link: "https://devpost.com/software/biasbreaker",
    },
    {
      title: "Trivia Bot",
      description: "a Discord bot for hosting trivia games across multiple categories with scoreboards, streak tracking, and leaderboards.",
      tags: ["Python", "SQLite", "Discord"],
      media: "/videos/triviabot_demo.mp4",
      mediaType: "video",
      playbackSpeed: 1.5,
      github: "https://github.com/AmmarA06/Trivia-Bot/",
    },
    {
      title: "Basketball Analysis App",
      description: "this project allows users to record and analyze player stats, including shots, blocks, and rebounds.",
      tags: ["Pygame", "Matplotlib"],
      media: "/projectimages/basketballapp.png",
      mediaType: "image",
      playbackSpeed: 1.0,
      github: "https://github.com/AmmarA06/Basketball-Analysis-App",
    },

  ];

  return (
    <>
      <MinimalistCursor />
      <div className="min-h-screen px-6 py-6 md:py-12 flex items-start md:items-center justify-center bg-neutral-900 light:bg-stone-50 transition-colors duration-300">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <header className="mb-10 flex items-center justify-between">
            <Link
              to="/"
              className="text-lg font-medium hover-underline cursor-pointer underline-offset-8 text-neutral-100 light:text-neutral-900"
            >
              Ammar Ahmad
            </Link>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLightMode(!lightMode)}
                className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors"
                aria-label="Toggle light mode"
              >
                {lightMode ? (
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </header>


          <div className="space-y-8">
            {projects.map((project, index) => {
              const videoRef = useRef(null);
              const [currentImageIndex, setCurrentImageIndex] = useState(0);
              
              useEffect(() => {
                if (videoRef.current && project.mediaType === "video") {
                  videoRef.current.playbackRate = project.playbackSpeed || 1.0;
                }
              }, [project.playbackSpeed, project.mediaType]);

              const images = Array.isArray(project.media) ? project.media : project.media ? [project.media] : [];
              const hasMultipleImages = images.length > 1;

              const nextImage = () => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
              };

              const prevImage = () => {
                setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
              };

              return (
                <div
                  key={index}
                  className="bg-neutral-800 light:bg-white rounded-lg overflow-hidden border border-neutral-700 light:border-neutral-200 hover:scale-[1.03] hover:shadow-2xl light:hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                {/* Media */}
                <div className={project.mediaType === "video" ? "aspect-video bg-neutral-700 light:bg-neutral-200 flex items-center justify-center" : "bg-neutral-700 light:bg-neutral-200 flex items-center justify-center relative"}>
                  {project.media ? (
                    project.mediaType === "video" ? (
                      <video
                        ref={videoRef}
                        src={project.media}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        loading="lazy"
                        preload="metadata"
                      />
                    ) : (
                      <>
                        <img
                          src={images[currentImageIndex]}
                          alt={`${project.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                        {hasMultipleImages && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              {currentImageIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <span className="text-neutral-500 light:text-neutral-400 text-sm py-24">
                      {project.mediaType === "video" ? "video placeholder" : "image placeholder"}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-medium text-neutral-100 light:text-neutral-900">
                      {project.title}
                    </h2>
                    <div className="flex gap-3 ml-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 transition-colors"
                          aria-label="Open Link"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-neutral-300 light:text-neutral-600 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tags, tagsIndex) => (
                      <span
                        key={tagsIndex}
                        className="text-xs px-1.5 py-1 bg-neutral-700 light:bg-neutral-100 text-neutral-300 light:text-neutral-700 rounded-md"
                      >
                        {tags}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <footer className="mt-12 flex gap-5">
            <a
              href="https://github.com/AmmarA06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/ammar-ahmad06/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/ammarahmad06_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:ammarahmadwrk@gmail.com"
              className="text-neutral-400 light:text-neutral-600 hover:text-neutral-100 light:hover:text-neutral-900 hover:scale-110 transition-all duration-200"
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

export default Projects;

