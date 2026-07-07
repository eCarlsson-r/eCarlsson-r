"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bot, Database, Globe, MonitorSmartphone, Server } from "lucide-react";
import { Architecture, ArchNodeKind } from "@/data/architectures";

const kindStyles: Record<ArchNodeKind, { icon: typeof Server; accent: string }> = {
  frontend: { icon: MonitorSmartphone, accent: "text-sky-600 dark:text-sky-400" },
  backend: { icon: Server, accent: "text-indigo-600 dark:text-indigo-400" },
  database: { icon: Database, accent: "text-amber-600 dark:text-amber-400" },
  ai: { icon: Bot, accent: "text-emerald-600 dark:text-emerald-400" },
  external: { icon: Globe, accent: "text-violet-600 dark:text-violet-400" },
};

const layers: { label: string; kinds: ArchNodeKind[] }[] = [
  { label: "Client Applications", kinds: ["frontend"] },
  { label: "API & Business Logic", kinds: ["backend"] },
  { label: "Data & Intelligence", kinds: ["database", "ai", "external"] },
];

interface Path {
  from: string;
  to: string;
  d: string;
}

export default function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { nodes, edges } = architecture;
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [paths, setPaths] = useState<Path[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const active = hovered ?? selected;
  const activeNode = nodes.find((n) => n.id === active);

  const isNeighbor = (id: string) =>
    !active ||
    id === active ||
    edges.some((e) => (e.from === active && e.to === id) || (e.to === active && e.from === id));

  const edgeActive = (e: Path) => active !== null && (e.from === active || e.to === active);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const crect = container.getBoundingClientRect();
    const next: Path[] = [];
    for (const edge of edges) {
      const a = nodeRefs.current[edge.from]?.getBoundingClientRect();
      const b = nodeRefs.current[edge.to]?.getBoundingClientRect();
      if (!a || !b) continue;
      const x1 = a.left + a.width / 2 - crect.left;
      const y1 = a.bottom - crect.top;
      const x2 = b.left + b.width / 2 - crect.left;
      const y2 = b.top - crect.top;
      const midY = (y1 + y2) / 2;
      // bow near-vertical edges sideways (alternating) so stacked
      // connections don't merge into one straight line on mobile
      const bow = Math.abs(x1 - x2) < 24 ? (next.length % 2 === 0 ? 48 : -48) : 0;
      next.push({
        ...edge,
        d: `M ${x1} ${y1} C ${x1 + bow} ${midY}, ${x2 + bow} ${midY}, ${x2} ${y2 - 4}`,
      });
    }
    setPaths(next);
  }, [edges]);

  useEffect(() => {
    measure();
    // re-measure once webfonts settle
    const timer = setTimeout(measure, 400);
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div className="my-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 md:p-6">
      <div ref={containerRef} className="relative">
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-gray-400/70" />
            </marker>
            <marker id="arch-arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
            </marker>
          </defs>
          {paths.map((p) => (
            <path
              key={`${p.from}-${p.to}`}
              d={p.d}
              fill="none"
              markerEnd={edgeActive(p) ? "url(#arch-arrow-active)" : "url(#arch-arrow)"}
              className={`transition-all ${
                edgeActive(p)
                  ? "stroke-primary"
                  : active
                    ? "stroke-gray-400/20"
                    : "stroke-gray-400/50"
              }`}
              strokeWidth={edgeActive(p) ? 2 : 1.5}
            />
          ))}
        </svg>

        <div className="flex flex-col gap-10">
          {layers.map((layer) => {
            const layerNodes = nodes.filter((n) => layer.kinds.includes(n.kind));
            if (layerNodes.length === 0) return null;
            return (
              <div key={layer.label}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {layer.label}
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                  {layerNodes.map((node) => {
                    const { icon: Icon, accent } = kindStyles[node.kind];
                    const dimmed = active !== null && !isNeighbor(node.id);
                    const isActive = node.id === active;
                    return (
                      <motion.button
                        key={node.id}
                        type="button"
                        ref={(el) => {
                          nodeRefs.current[node.id] = el;
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onClick={() => setSelected(selected === node.id ? null : node.id)}
                        onMouseEnter={() => setHovered(node.id)}
                        onMouseLeave={() => setHovered(null)}
                        aria-pressed={selected === node.id}
                        className={`relative z-10 flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition
                          bg-white dark:bg-zinc-900
                          ${isActive ? "border-primary shadow-lg" : "border-gray-200 dark:border-white/15 hover:border-primary/60"}
                          ${dimmed ? "opacity-40" : ""}`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${accent}`} />
                        <span>
                          <span className="block text-sm font-semibold">{node.label}</span>
                          {node.tech && (
                            <span className="block text-xs text-muted-foreground">{node.tech}</span>
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 min-h-14 rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm">
        {activeNode ? (
          <>
            <span className="font-semibold">{activeNode.label}</span>
            <span className="text-muted-foreground"> — {activeNode.description}</span>
          </>
        ) : (
          <span className="text-muted-foreground">
            Tap or hover a component to see its role in the system.
          </span>
        )}
      </div>
    </div>
  );
}
