import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Filter } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Orientation = "landscape" | "portrait";

interface WorkVideo {
  id: string;
  videoUrl: string; // YouTube /embed/ URL
  title: string;
  category: string;
  orientation: Orientation;
}

const allVideos: WorkVideo[] = [
  // 6 landscape (16:9)
  {
    id: "v1",
    videoUrl: "https://www.youtube.com/embed/fIPAKrPEfeg",
    title: "movie trailer edit",
    category: "Showreel",
    orientation: "landscape",
  },
  {
    id: "v2",
    videoUrl: "https://www.youtube.com/embed/tYIlCWtaIgE",
    title: "art Direction",
    category: "Motion",
    orientation: "landscape",
  },
  {
    id: "v3",
    videoUrl: "https://www.youtube.com/embed/Yr_lN6TvLh0",
    title: "kashmir ",
    category: "Narrative",
    orientation: "landscape",
  },
  {
    id: "v4",
    videoUrl: "https://www.youtube.com/embed/2On10OXlpW0",
    title: "3d tracking Video Edit",
    category: "Creative",
    orientation: "landscape",
  },
  {
    id: "v5",
    videoUrl: "https://www.youtube.com/embed/p8jEzCQ_JBY",
    title: "vintage vibe",
    category: "showreel",
    orientation: "landscape",
  },
  {
    id: "v6",
    videoUrl: "https://www.youtube.com/embed/OhDLJ8sALEA",
    title: "Brand Showreel",
    category: "Showreel",
    orientation: "landscape",
  },
  {
    id: "v7",
    videoUrl: "https://www.youtube.com/embed/Xsl_99ApzEU",
    title: "Brand Showreel",
    category: "Showreel",
    orientation: "landscape",
  },
  {
    id: "v8",
    videoUrl: "https://www.youtube.com/embed/bMYudZPCbSQ",
    title: "shrink effect",
    category: "Showreel",
    orientation: "landscape",
  },
  {
    id: "v9",
    videoUrl: "https://www.youtube.com/embed/Gs4VIV1rL9A",
    title: "Blender animation",
    category: "Showreel",
    orientation: "landscape",
  },

  // 6 portrait (Shorts-style, 9:16)
  {
    id: "v10",
    videoUrl: "https://www.youtube.com/embed/pDffEtJz4VQ",
    title: "Shorts Cut 1",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v11",
    videoUrl: "https://www.youtube.com/embed/c9xpYUM_voo",
    title: "Shorts Cut 2",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v12",
    videoUrl: "https://www.youtube.com/embed/8XPzVCSOBFA",
    title: "Shorts Cut 3",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v13",
    videoUrl: "https://www.youtube.com/embed/S_QPKjvQYmo",
    title: "Shorts Cut 4",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v14",
    videoUrl: "https://www.youtube.com/embed/zPEeClWx5EM",
    title: "Shorts Cut 5",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v15",
    videoUrl: "https://www.youtube.com/embed/L4gJQasWbCc",
    title: "Shorts Cut 6",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v16",
    videoUrl: "https://www.youtube.com/embed/NaX8wYkZ1iU",
    title: "Shorts Cut 6",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v17",
    videoUrl: "https://www.youtube.com/embed/bCvncttzuPI",
    title: "Shorts Cut 6",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v18",
    videoUrl: "https://www.youtube.com/embed/-xn1VK3xW3E",
    title: "Shorts Cut 6",
    category: "Short",
    orientation: "portrait",
  },
  {
    id: "v18",
    videoUrl: "https://www.youtube.com/embed/a56dXBa5PF4",
    title: "Shorts Cut 6",
    category: "Short",
    orientation: "portrait",
  },
];

const categories = [
  "All",
  "Commercial",
  "Motion",
  "Narrative",
  "Creative",
  "Digital",
  "Showreel",
  "Live",
  "Motion Graphics",
  "Short",
];

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<{
    videoUrl: string;
    title: string;
    category: string;
  } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredVideos =
    selectedCategory === "All"
      ? allVideos
      : allVideos.filter((v) => v.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.p
              className="text-sm font-medium uppercase tracking-[0.3em] text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Portfolio
            </motion.p>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              All <span className="text-gradient-accent">Projects</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore my complete portfolio of video editing, motion graphics,
              and visual storytelling projects.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 lg:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredVideos.map((video, index) => {
              const aspectClass =
                video.orientation === "portrait"
                  ? "aspect-[9/16]"
                  : "aspect-video";

              return (
                <motion.div
                  key={video.id}
                  className={`group relative ${aspectClass} rounded-2xl overflow-hidden cursor-pointer bg-card/30 border border-border/50`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() =>
                    setSelectedVideo({
                      videoUrl: video.videoUrl,
                      title: video.title,
                      category: video.category,
                    })
                  }
                  whileHover={{ scale: 1.02 }}
                >
                  <iframe
                    src={video.videoUrl}
                    className="w-full h-full"
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      filter:
                        hoveredId && hoveredId !== video.id
                          ? "brightness(0.5)"
                          : "brightness(1)",
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary mb-1">
                      {video.category}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {video.title}
                    </h3>
                  </div>

                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow:
                        "inset 0 0 60px 10px hsl(var(--glow-primary) / 0.1)",
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Video Modal */}
      <VideoModal
        isOpen={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ""}
        title={selectedVideo?.title || ""}
        category={selectedVideo?.category || ""}
      />
    </main>
  );
};

export default Work;
