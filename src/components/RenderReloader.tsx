import { motion, AnimatePresence } from "framer-motion";
import { Reloader } from "../types";
import ListItem from "./ListItem";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useMediaQuery } from "../hooks/use-media-query";

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

function RenderReloader({
  reloader,
  currentIndex,
}: {
  reloader: Reloader;
  currentIndex: number;
}) {
  const DELAY = 4;
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    // Show the logo when the currentIndex changes.
    setShowLogo(true);
  }, [currentIndex]);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <AnimatePresence mode="popLayout" key={reloader.user_id}>
      {showLogo ? (
        <div className="h-screen absolute grid place-items-center inset-0 z-10 bg-beige">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ type: "just", duration: 0.3 }}
            onAnimationComplete={() =>
              setTimeout(() => {
                setShowLogo(false);
              }, 800)
            }
          >
            <Logo className="w-16" />
          </motion.div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid lg:grid-cols-2 mx-auto h-full max-w-7xl place-content-center"
        >
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between max-w-[800px]">
              <motion.h2
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: DELAY, type: "spring" }}
                className="font-bold text-2xl"
              >
                KarmaKronede
              </motion.h2>
              <motion.h2
                className="text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: DELAY }}
              >
                Reload ros i uge {reloader.week}, {reloader.year}
              </motion.h2>
            </div>
            <motion.img
              src={reloader.avatar_url}
              alt={reloader.full_name}
              height={600}
              width={800}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: DELAY, type: "spring" }}
              className="mt-2"
            />

            <motion.p
              className="text-2xl lg:text-8xl whitespace-nowrap"
              initial={{ opacity: 1, y: isDesktop ? -500 : -250 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY }}
            >
              {reloader.full_name}
            </motion.p>
          </div>

          <div className="flex flex-col space-y-6 md:space-y-12 md:mt-24 md:mx-20">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: DELAY }}
              className="text-2xl font-bold mt-4 md:mt-0"
            >
              Hvad kollegerne siger 👏
            </motion.h3>
            <ListItem>
              {reloader.votes.map((vote, index) => (
                <motion.li
                  initial={{ opacity: 0, x: 200 }}
                  key={`${index}-${vote}`}
                  className="text-xl"
                >
                  <p className="inline ml-2 text-2xl">{vote}</p>
                </motion.li>
              ))}
            </ListItem>
          </div>
          <Confetti
            numberOfPieces={130}
            recycle={false}
            colors={["#D28BC7", "#FFE14C", "#FFC526", "#FE810B"]}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RenderReloader;
