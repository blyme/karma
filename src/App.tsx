import { motion } from "framer-motion";
import useGetKarmaPeople from "./hooks/useGetKarmaPeople";
import { useEffect, useState } from "react";
import RenderReloader from "./components/RenderReloader";
import Logo from "./components/Logo";

function App() {
  const { data: reloaders, isLoading } = useGetKarmaPeople();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!isLoading && reloaders) {
      const interval = setInterval(() => {
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
      <main className="bg-beige h-screen w-full p-4 lg:p-24 mt-auto">
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
