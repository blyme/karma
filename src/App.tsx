import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";
import useGetKarmaPeople from "./hooks/useGetKarmaPeople";
import { useEffect, useState } from "react";
import { Reloader } from "./types";

function ListItem({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate(
      "li",
      { opacity: 1, x: 0 },
      { delay: stagger(0.4, { startDelay: 4.5 }) }
    );
  });
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={scope}
      className="space-y-6 list-['\2192'] list-inside marker:text-yellow marker:mr-5"
    >
      {children}
    </motion.ul>
  );
}

function Logo() {
  return (
    <svg
      width="252"
      height="303"
      viewBox="0 0 252 303"
      fill="#0E223B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M195.727 134.059C205.185 149.59 209.228 167.819 207.223 185.892C205.219 203.966 197.28 220.866 184.649 233.947C172.017 247.029 155.406 255.555 137.414 258.19C119.421 260.826 101.062 257.424 85.2095 248.515C69.3565 239.607 56.9037 225.694 49.7992 208.955C42.6947 192.216 41.3392 173.594 45.9449 156.002C50.5505 138.41 60.8573 122.841 75.2531 111.731C89.6489 100.621 107.321 94.5955 125.506 94.5981L100.138 119.966L125.506 145.333L172.687 98.152L198.055 72.7844L125.506 0.235352L100.138 25.603L125.506 50.9706C97.74 50.9943 70.7643 60.2169 48.7955 77.1969C26.8267 94.1769 11.103 117.957 4.08208 144.821C-2.9388 171.685 -0.861114 200.118 9.99037 225.675C20.8419 251.233 39.8555 272.475 64.0594 286.081C88.2632 299.687 116.293 304.89 143.768 300.877C171.242 296.864 196.613 283.861 215.914 263.901C235.215 243.94 247.358 218.147 250.446 190.554C253.534 162.96 247.393 135.121 232.981 111.387L195.727 134.059Z" />
    </svg>
  );
}

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
        <h1 className="text-3xl">
          Ingen er nomineret til Reload ros i denne uge 😣
        </h1>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 360 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Logo />
        </motion.div>
      </main>
    );
  }

  const renderReloader = (reloader: Reloader) => {
    return (
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, position: "absolute", zIndex: -1 }}
          transition={{ type: "spring" }}
          className="grid grid-cols-2 p-2 h-full"
        >
          <div>
            <div className="flex items-center justify-between max-w-[800px]">
              <motion.h2
                initial={{ opacity: 1, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, type: "spring", bounce: 0.25 }}
                className="font-bold"
              >
                KarmaKronede
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                Reload ros i uge {reloader.week}, {reloader.year}
              </motion.h2>
            </div>
            <motion.img
              src={reloader.avatar_url}
              height={600}
              width={800}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, type: "spring" }}
            />

            <motion.p
              className="text-8xl whitespace-nowrap"
              initial={{ opacity: 1, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 }}
            >
              {reloader.full_name}
            </motion.p>
          </div>

          <div className="flex flex-col space-y-12 mt-24 mx-20">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="text-2xl"
            >
              Hvad kollegerne siger 👏
            </motion.h3>
            <ListItem>
              {reloader.votes.map((vote, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -200 }}
                  key={`vote-${index}`}
                  className="text-xl"
                >
                  <p className="inline ml-2">{vote}</p>
                </motion.li>
              ))}
            </ListItem>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <main className="bg-beige h-screen w-full p-24 mt-auto">
        {reloaders && renderReloader(reloaders[currentIndex])}
      </main>
    </>
  );
}

export default App;
