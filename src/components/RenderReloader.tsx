import {
  type DynamicAnimationOptions,
  useAnimate,
  motion,
  stagger,
} from "framer-motion";
import Emoji from "react-emoji-render";
import type { Reloader } from "../types";
import { useEffect } from "react";
import Logo from "./Logo";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function RenderReloader({
  reloader,
  currentIndex,
}: {
  reloader: Reloader;
  currentIndex: number;
}) {
  const { width, height } = useWindowSize();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const DEFAULT_ANIMATION_OPTIONS: DynamicAnimationOptions = {
      type: "spring",
      bounce: 0.1,
      duration: 1,
    };

    const animation = async () => {
      await animate(
        "[data-framer-target='logo']",
        {
          scale: 1,
          rotate: 720,
        },
        { duration: 0.4 }
      );

      await animate(
        "[data-framer-target='logo']",
        {
          scale: 0,
        },
        { delay: 0.4 }
      );

      await animate(
        "[data-framer-target='logoContainer']",
        {
          opacity: 0,
        },
        { delay: 0.4 }
      );

      await Promise.all([
        animate(
          "[data-framer-target='fullName']",
          {
            y: -480,
            opacity: 1,
          },
          { ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='karmaKronede']",
          {
            y: 280,
            opacity: 1,
          },
          { ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='karmaWeek']",
          {
            y: 280,
            x: -150,
            opacity: 0,
          },
          { ...DEFAULT_ANIMATION_OPTIONS }
        ),
      ]);

      // Animate the karmaKronede and fullName elements back to 0.
      await Promise.all([
        animate(
          "[data-framer-target='karmaKronede']",
          {
            y: 0,
          },
          { delay: 1.5, ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='karmaWeek']",
          {
            y: 0,
            x: 0,
            opacity: 1,
          },
          { delay: 1.5, ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='avatar']",
          {
            scale: 1,
            opacity: 1,
          },
          { delay: 1.5, ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='fullName']",
          {
            y: 0,
            fontSize: "48px",
          },
          { delay: 1.5, ...DEFAULT_ANIMATION_OPTIONS }
        ),

        animate(
          "[data-framer-target='colleagues']",
          {
            x: 0,
            opacity: 1,
          },
          { delay: 1.5, ...DEFAULT_ANIMATION_OPTIONS }
        ),
      ]);

      await animate(
        "[data-framer-target='vote']",
        {
          opacity: 1,
          x: 0,
        },
        {
          ...DEFAULT_ANIMATION_OPTIONS,
          delay: stagger(0.2),
        }
      );
    };

    animation();
  }, [currentIndex, animate, scope, height]);

  return (
    <div
      ref={scope}
      key={reloader.user_id}
      className="grid md:grid-cols-2 place-content-center mx-auto max-w-screen-2xl h-full"
    >
      <div
        className="h-screen absolute grid place-items-center inset-0 z-10 bg-beige"
        data-framer-target="logoContainer"
      >
        <motion.div initial={{ scale: 0 }} data-framer-target="logo">
          <Logo className="w-16" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <motion.h1
            initial={{
              y: -300,
              opacity: 0,
            }}
            data-framer-target="karmaKronede"
            className="relative z-10 font-bold text-2xl"
          >
            KarmaKronede
          </motion.h1>
          <motion.p
            initial={{
              y: -300,
              opacity: 0,
            }}
            data-framer-target="karmaWeek"
            className="relative z-10 ml-auto text-2xl"
          >
            Reload Ros i uge {reloader.week}, {reloader.year}
          </motion.p>
        </div>

        <motion.div
          data-framer-target="avatar"
          initial={{ scale: 3, opacity: 0 }}
        >
          <img
            className="w-full max-h-[800px] object-cover"
            src={reloader.avatar_url}
            alt={`Billede af Reloader ${reloader.full_name}`}
          />
        </motion.div>

        <motion.h2
          data-framer-target="fullName"
          initial={{ y: 0, opacity: 1 }}
          className="text-2xl leading-none lg:text-[88px] whitespace-nowrap"
        >
          {reloader.full_name}
        </motion.h2>
      </div>

      <div className="flex flex-col space-y-6 md:space-y-12 md:mt-24 md:mx-20">
        <motion.h2
          initial={{ x: 300, opacity: 0 }}
          data-framer-target="colleagues"
          className="font-bold text-3xl"
        >
          <Emoji>Hvad kollegerne siger :clap:</Emoji>
        </motion.h2>
        <ul className="space-y-6 list-['\2192'] text-3xl list-inside marker:text-yellow marker:mr-5">
          {reloader.votes.map((vote, index) => (
            <motion.li
              data-framer-target="vote"
              key={`${index}-${vote}`}
              initial={{ x: 300, opacity: 0 }}
            >
              <Emoji className="inline ml-2">{vote}</Emoji>
            </motion.li>
          ))}
        </ul>
      </div>

      <Confetti
        width={width}
        height={height}
        recycle={false}
        colors={["#D28BC7", "#FFE14C", "#FFC526", "#FE810B"]}
      />
    </div>
  );
}

export default RenderReloader;
