import { motion } from "framer-motion";
import { Braces, Cloud, Github, Slack, Webhook } from "lucide-react";

const stack = [
  { name: "Slack", icon: Slack },
  { name: "CI/CD", icon: Braces },
  { name: "GitHub", icon: Github },
  { name: "Vercel", icon: Cloud },
  { name: "API", icon: Braces },
  { name: "Webhook", icon: Webhook }
];

export function LogoMarquee() {
  return (
    <div className="mx-auto mt-14 max-w-6xl border-y border-white/[.08] py-10">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-white/40">[02] Stack</p>
      <h3 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
        Built for modern web teams, whatever the stack.
      </h3>
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {stack.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06, duration: 0.55 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-white/[.08] bg-white/[.02] px-4 py-5"
          >
            <item.icon className="h-4 w-4 text-white/78" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
