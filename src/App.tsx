import { motion } from "framer-motion";
import useGetKarmaPeople from "./hooks/useGetKarmaPeople";
import { useEffect, useState } from "react";
import RenderReloader from "./components/RenderReloader";

function App() {
  const { data: reloaders, isLoading } = useGetKarmaPeople();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!isLoading && reloaders) {
      const interval = setInterval(() => {
        // We use the modulus operator (%) to wrap the index around to 0 if
        // it exceeds the length of reloaders.
        // This creates a circular or looping effect.
        setCurrentIndex((prev) => (prev + 1) % reloaders.length);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, reloaders, isLoading]);

  if (reloaders?.length === 0) {
    return (
      <main className="bg-beige h-screen w-full grid place-items-center">
        <h1 className="text-4xl">
          Ingen er nomineret til Reload ros i denne uge 😣 Kom igang!
        </h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 0.7, 1, 0.7] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 4,
            times: [0, 0.2, 0.5, 0.8, 1],
            delay: 1.5,
          }}
        >
          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: -1000, rotate: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                type: "spring",
              }}
              className="text-8xl absolute left-1/2 -translate-x-1/2 -top-9"
            >
              👑
            </motion.p>
            <img
              alt="Rasmus fik mig til det..."
              src="https://www.gravatar.com/avatar/462dad0dd24c568a32dcdb0ae895ae1b?s=500"
              className="rounded-full object-cover"
            />
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <>
      <main className="bg-beige p-24 h-screen">
        {reloaders ? (
          <RenderReloader
            reloader={reloaders[currentIndex]}
            currentIndex={currentIndex}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;
