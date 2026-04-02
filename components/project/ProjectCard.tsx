import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  title: string;
  summary: string;
  backend: string[];
  frontend: string[];
}

export default function ProjectCard({
  slug,
  title,
  summary,
  backend,
  frontend,
}: Props) {
  return (
    <div className="min-w-[90vw] md:min-w-[500px] snap-start group bg-surface-container-high p-6 border-b-2 border-transparent hover:border-primary transition-all">
      <div className="aspect-video overflow-hidden mb-6">
        <Image alt="" width="200" height="100" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-x4HCdpkGQrrpgkVwZYSBd1TmR9o06sEBosqJW6-lYwJbYd8XWSAjB2sp2NKPjh8gW2-k-7kYEz3mrDWY-4V8EcLhvCmLWS_ZNq7AuM2Wl-bDQplLHatQh4BNUX70ijXQoNhRVM_eHChGH_aayZjaaT9yPuNssGXxkLRO8fG9USNha3mdPLDYV6pxKkbPFUd83DD4v6nSPGXcL4nv3LAPVYPB92UAyLqLaHJz32nSZYfyRKu-QvSbr2-TbV1Kogn555ip89EtrZQ"/>
      </div>
      <h3 className="text-2xl font-headline font-bold mb-3 text-on-surface">{title}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{summary}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {[...backend, ...frontend].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-surface-container-highest font-label text-[10px] uppercase tracking-tighter text-secondary"
          >
            {tech}
          </span>
        ))}
        </div>
        <Link href={`/projects/${slug}`} className="font-label text-xs uppercase tracking-widest text-primary font-bold border-b border-primary pb-1 hover:opacity-70 transition-opacity">View Case Study</Link>
      </div>
    </div>
  );
}