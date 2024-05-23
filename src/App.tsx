import { motion } from "framer-motion";
import useGetKarmaPeople from "./hooks/useGetKarmaPeople";
import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import RenderReloader2 from "./components/RenderReloader";

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
          Ingen er nomineret til Reload ros i denne uge 😣
        </h1>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{ type: "spring", duration: "infinite" }}
        >
          <Logo />
        </motion.div>
      </main>
    );
  }

  return (
    <>
      <main className="bg-beige p-24 h-screen">
        {reloaders ? (
          <RenderReloader2
            reloader={reloaders[currentIndex]}
            currentIndex={currentIndex}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;
