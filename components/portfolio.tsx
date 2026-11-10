"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CustomCursor from "./custom-cursor";
import MagneticLink from "./magnetic-link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Github, Instagram, Menu, Sparkles, X, Youtube
} from "lucide-react";

const ChromeScene = dynamic(() => import("./chrome-scene"), { ssr: false });

type Project = {
  id: string;
  name: string;
  type: string;
  role: string;
  description: string;
  year: string;
  tech: string;
  tone: string;
  repoUrl: string;
  videoUrl?: string;
  videoPlatform?: "youtube" | "instagram";
  downloadUrl?: string;
};

const projects: Project[] = [
  {
    id: "01",
    name: "UIIKantin",
    type: "Sistem pemesanan kantin",
    role: "Project Manager · Backend Developer",
    description: "Aplikasi web untuk melihat layanan kantin dan memulai pemesanan secara online.",
    year: "2024",
    tech: "PHP · JavaScript · CSS",
    tone: "lime",
    repoUrl: "https://github.com/ShihabuddinAH/UIIKantin",
  },
  {
    id: "02",
    name: "BrackIt",
    type: "Platform turnamen esports",
    role: "Project Manager · Backend Developer",
    description: "Sistem multi-role untuk pemain, penyelenggara, dan admin mengelola turnamen serta tim.",
    year: "2025",
    tech: "PHP · MySQL · JavaScript",
    tone: "violet",
    repoUrl: "https://github.com/ShihabuddinAH/BrackIt",
    videoUrl: "https://youtu.be/wZt92Qz0UvY",
    videoPlatform: "youtube",
  },
  {
    id: "03",
    name: "LADZ-27-Outbreak",
    type: "Pengembangan game",
    role: "Project Manager · Game Developer",
    description: "Proyek game yang dikembangkan menggunakan Unity dan C#.",
    year: "2026",
    tech: "Unity · C#",
    tone: "blue",
    repoUrl: "https://github.com/ShihabuddinAH/LADZ-27-Outbreak",
    videoUrl: "https://youtu.be/5uB0JMBLKto",
    videoPlatform: "youtube",
    downloadUrl: "https://drive.google.com/file/d/1_rS4A-OBkADDgPe9gObpeN13S6g_Vw4y/view?usp=sharing",
  },
  {
    id: "04",
    name: "Atturin",
    type: "Sistem manajemen turnamen",
    role: "Hacker · Full-Stack Developer",
    description: "Aplikasi untuk mengelola turnamen, tim, jadwal pertandingan, bracket, dan livescore.",
    year: "2026",
    tech: "Laravel · PHP · Blade",
    tone: "coral",
    repoUrl: "https://github.com/shihabuddinandih/Atturin",
    videoUrl: "https://www.instagram.com/reel/Da6kLAGJhbE/?dlrf=aW1xeGlmb3EwenRy",
    videoPlatform: "instagram",
  },
];

const tools = ["PHP", "Laravel", "JavaScript", "MySQL", "C#", "Unity"];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number} / 05</span><span>{children}</span></div>;
}

function GlassNav() {
  const [open, setOpen] = useState(false);
  const links = [["Proyek", "#projects"], ["Tentang", "#about"], ["Perjalanan", "#experience"], ["Keahlian", "#skills"], ["Kontak", "#contact"]];
  return (
    <header className="nav-wrap">
      <a href="#top" className="brand" aria-label="Shihab home"><span className="brand-mark">✳</span><span>SHIHAB</span></a>
      <nav className="desktop-nav glass">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <div className="nav-right">
        <span className="availability glass"><i /> WEB · GAME DEVELOPER</span>
        <button className="menu-button glass" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>
      {open && <nav className="mobile-nav glass">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16}/></a>)}</nav>}
    </header>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article className={`project-card ${project.tone}`}
      variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -7, rotate: index % 2 ? 0.5 : -0.5 }} transition={{ duration: 0.25 }}>
      <div className="project-meta"><span>{project.id} / {project.type.toUpperCase()}</span><span>{project.year}</span></div>
      <div className="project-bottom">
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span className="project-role">{project.role}</span>
          <span className="project-tech">{project.tech}</span>
        </div>
        <div className="project-links">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Lihat kode sumber ${project.name} di GitHub`}>
            <Github size={16}/>
          </a>
          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Tonton video ${project.name} di ${project.videoPlatform === "instagram" ? "Instagram" : "YouTube"}`}>
              {project.videoPlatform === "instagram" ? <Instagram size={16}/> : <Youtube size={18}/>}
            </a>
          )}
          {project.downloadUrl && (
            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" aria-label={`Unduh ${project.name} dari Google Drive`}>
              <ArrowDown size={16}/>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroStickerY = useTransform(heroProgress, [0, 1], [0, -110]);

  return (
    <main id="top">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <CustomCursor />
      <GlassNav />

      <section ref={heroRef} className="hero section-light">
        <div className="grid-overlay"/>
        <div className="hero-side-note">WEB DEVELOPER · GAME DEVELOPER</div>
        <motion.div
          className="hero-copy"
          style={reduceMotion ? undefined : { y: heroCopyY, opacity: heroCopyOpacity }}
        >
          <p className="eyebrow"><span className="eyebrow-dot"/> PENGEMBANG WEB · PENGEMBANG GAME</p>
          <h1>SAYA<br/>MEMBANGUN<br/><span>PRODUK</span><br/>DIGITAL<span className="period">.</span></h1>
          <p className="hero-intro">Sistem informasi, platform turnamen,<br/>dan pengalaman game interaktif.</p>
          <MagneticLink className="pill-button dark-button" href="#projects">Lihat proyek <ArrowUpRight size={17}/></MagneticLink>
        </motion.div>
        <ChromeScene reducedMotion={reduceMotion} />
        <div className="hero-glass glass">
          <span className="mini-index">PORTOFOLIO · 2024—2026</span>
          <strong>Dari ide menjadi<br/>produk digital.</strong>
          <span className="hero-glass-foot">WEB · SISTEM · GAME <ArrowUpRight size={16}/></span>
        </div>
        <a href="#projects" className="scroll-cue"><span className="scroll-icon"><ArrowDown size={14}/></span> GULIR UNTUK MELIHAT</a>
        <motion.span className="hero-sticker" style={reduceMotion ? undefined : { y: heroStickerY }}>✳</motion.span>
      </section>

      <section id="projects" className="projects-section section-light section-pad">
        <div className="section-heading">
          <div><SectionLabel number="01">KARYA</SectionLabel><h2>PROYEK<br/>PILIHAN<span className="purple-dot">.</span></h2></div>
          <p>Beberapa sistem web dan game<br/>yang pernah saya kembangkan.</p>
          <a className="text-link" href="#contact">Ingin berkolaborasi? <ArrowUpRight size={16}/></a>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i}/>)}
        </div>
      </section>

      <section id="about" className="about-section section-dark section-pad">
        <div className="about-intro">
          <SectionLabel number="02">TENTANG SAYA</SectionLabel>
          <h2>MEMBANGUN<br/>PRODUK DIGITAL<span className="lime-dot">.</span><br/><em>DARI SISTEM WEB<br/>HINGGA GAME.</em></h2>
        </div>
        <div className="about-copy">
          <div className="portrait-frame"><Image className="portrait-image" src="/foto-profil.jpg" alt="Foto profil Shihab" width={1024} height={1536} sizes="(max-width: 640px) 40vw, 330px"/><span className="portrait-caption">WEB · SISTEM INFORMASI · GAME</span></div>
          <div className="about-text"><p>Saya mengembangkan aplikasi web dan game, mulai dari sistem pemesanan dan platform turnamen hingga proyek game berbasis Unity.</p><p className="muted">Saya senang mengubah kebutuhan dan ide menjadi produk digital yang bisa digunakan.</p><MagneticLink href="#experience" className="outline-button">Lihat perjalanan <ArrowUpRight size={16}/></MagneticLink></div>
        </div>
        <div className="about-orbit">✳</div>
      </section>

      <section id="experience" className="experience-section section-light section-pad">
        <div className="experience-title"><SectionLabel number="03">PENGALAMAN</SectionLabel><h2>PENGALAMAN<span className="purple-dot">.</span></h2><p>Perjalanan akademik<br/>dan organisasi.</p></div>
        <div className="timeline">
          {[["2026","Asisten Mandiri Keamanan Siber dan Informasi","Semester 6."],["2026","Ketua Tim Perintisan Bisnis (Hacker)","UII."],["2026","Asisten Mandiri Keamanan Siber dan Informasi IP","Semester 7."],["2026","Asisten Lab. Sistem Informasi dan Rekayasa Perangkat Lunak","Semester 7."],["2026","Asisten Lab. Multimedia dan Visi Komputer","Semester 7."],["2025","Staff Wali Jamaah — Pesona Ta'aruf Universitas Islam Indonesia (PESTA UII)","Kepanitiaan tahun 2025."],["2025","Staff Acara — INPUT","Ospek jurusan."],["2024","Staff Acara — Porseni Informatika (PORSEMATIK)","Kepanitiaan tahun 2024."]].map(([date, role, desc]) =>
            <motion.div className="timeline-item" key={`${date}-${role}`} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><span className="timeline-dot"/><span className="timeline-date">{date}</span><div><h3>{role}</h3><p>{desc}</p></div></motion.div>
          )}
        </div>
        <div className="experience-shape" aria-hidden="true"/>
      </section>

      <section id="skills" className="skills-section section-dark section-pad">
        <div><SectionLabel number="04">TEKNOLOGI</SectionLabel><h2>SKILLS &<br/>TOOLS<span className="lime-dot">.</span></h2><p className="muted">Teknologi yang digunakan<br/>dalam proyek-proyek saya.</p></div>
        <div className="tool-grid">{tools.map((tool, i) => <motion.div key={tool} className="tool-chip glass" whileHover={{ y: -5, rotate: i % 2 ? 2 : -2 }}><span className="tool-symbol">{["PHP","L","JS","DB","C#","U"][i]}</span><span>{tool}</span><ArrowUpRight size={14}/></motion.div>)}</div>
        <div className="skills-note"><Sparkles size={18}/> BELAJAR · MEMBANGUN · BERKEMBANG</div>
      </section>

      <section id="contact" className="contact-section section-lime section-pad">
        <div className="contact-orb" aria-hidden="true"/>
        <SectionLabel number="05">KONTAK</SectionLabel>
        <div className="contact-content"><h2>PUNYA IDE?<br/>MARI BANGUN<br/>SESUATU YANG<br/><span>BERGUNA.</span></h2><div className="contact-action"><p>Jelajahi kode dan proyek saya di GitHub.</p><MagneticLink wrapperClassName="magnetic-wrap-full" className="contact-button glass" href="https://github.com/ShihabuddinAH">KUNJUNGI GITHUB <span><ArrowUpRight size={24}/></span></MagneticLink><div className="social-links"><a href="https://github.com/ShihabuddinAH" target="_blank" rel="noopener noreferrer" aria-label="GitHub ShihabuddinAH"><Github size={18}/></a><a href="https://github.com/shihabuddinandih" target="_blank" rel="noopener noreferrer" aria-label="GitHub shihabuddinandih"><Github size={18}/></a></div></div></div>
      </section>

      <footer className="footer">
        <a href="#top" className="footer-brand"><span>✳</span> SHIHAB</a>
        <span>© {new Date().getFullYear()} SHIHAB. HAK CIPTA DILINDUNGI.</span>
        <a href="#top" className="back-top">KEMBALI KE ATAS <ArrowDownRight size={15}/></a>
      </footer>
    </main>
  );
}