import { type Reloader } from "../types";
import { motion } from "framer-motion";

function Reloader({ reloader }: { reloader: Reloader }) {
  return (
    <div data-reloader={reloader.full_name} className="mx-auto w-1/2">
      <div className="relative w-full">
        <motion.img
          className="h-64 w-64 rounded-lg object-cover mx-auto"
          alt={reloader.full_name}
          src={reloader.avatar_url}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1 }}
        />

        <div className="absolute top-8 left-1/2 -translate-x-1/2 -z-10 bg-yellow-400 h-64 w-full mx-auto rounded-lg"></div>
      </div>
      <p>{reloader.full_name}</p>

      {reloader.votes.map((vote) => (
        <p key={vote}>{vote}</p>
      ))}
    </div>
  );
}

export default Reloader;
