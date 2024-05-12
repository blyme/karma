import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

function ListItem({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate(
      "li",
      { opacity: 1, x: 0 },
      { delay: stagger(0.2, { startDelay: 4.5 }) }
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

export default ListItem;
