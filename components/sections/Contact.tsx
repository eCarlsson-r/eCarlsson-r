"use client";
import { FileDown, Github, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="py-20 px-6 bg-surface-container-high text-on-surface">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("eyebrow")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("description")}</p>

          <form action="mailto:e.carlsson.r@gmail.com" method="POST" className="space-y-3 mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="name">
                <span className="mb-1 block font-medium text-muted-foreground">{t("nameLabel")} <span className="text-primary">*</span></span>
                <input required={true} name="name" id="name" className="w-full rounded-lg" placeholder={t("namePlaceholder")} />
              </label>
              <label htmlFor="email">
                <span className="mb-1 block font-medium text-muted-foreground">{t("emailLabel")} <span className="text-primary">*</span></span>
                <input required={true} type="email" id="email" name="email" className="w-full rounded-lg" placeholder={t("emailPlaceholder")} />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="type">
                <span className="mb-1 block font-medium text-muted-foreground">{t("projectTypeLabel")} <span className="text-primary">*</span></span>
                <select required={true} name="type" className="w-full rounded-lg">
                  <option>{t("projectTypeOptions.customSystem")}</option>
                  <option>{t("projectTypeOptions.aiFeature")}</option>
                  <option>{t("projectTypeOptions.consultation")}</option>
                  <option>{t("projectTypeOptions.other")}</option>
                </select>
              </label>
              <label htmlFor="budget">
                <span className="mb-1 block font-medium text-muted-foreground">{t("budgetLabel")} </span>
                <select name="budget" className="w-full rounded-lg">
                  <option value="">{t("budgetOptions.none")}</option>
                  <option value="<1000">{t("budgetOptions.lt1k")}</option>
                  <option value="1000-5000">{t("budgetOptions.1k-5k")}</option>
                  <option value="5000-10000">{t("budgetOptions.5k-10k")}</option>
                  <option value=">10000">{t("budgetOptions.gt10k")}</option>
                </select>
              </label>
            </div>
            <label htmlFor="message">
              <span className="mb-1 block font-medium text-muted-foreground">{t("messageLabel")} <span className="text-primary">*</span></span>
              <textarea required={true} name="message" rows={5} className="w-full rounded-lg resize-none" placeholder={t("messagePlaceholder")}></textarea>
            </label>
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60">
              <Send className="h-4 w-4" />{t("sendButton")}
            </button>
          </form>
        </motion.div>

        <aside className="space-y-3">
          <motion.a
            whileHover={{ scale: 1.05 }} href="mailto:e.carlsson.r@gmail.com" rel="noreferrer"
            className="group flex items-center gap-4 p-4 bg-secondary text-white dark:bg-white dark:text-secondary rounded-xl shadow-lg transition"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-muted-foreground">
              <Mail className="w-4 h-4" />
            </span>
            
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">
                {t("aside.email")}
              </span>
              <span className="block truncate text-sm font-medium text-muted-foreground transition-colors">
                e.carlsson.r@gmail.com
              </span>
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }} href="https://linkedin.com/in/albert-hartanto-b92036396" rel="noreferrer"
            className="group flex items-center gap-4 p-4 bg-secondary text-white dark:bg-white dark:text-secondary rounded-xl shadow-lg transition"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-muted-foreground">
              <Linkedin className="w-4 h-4" />
            </span>
            
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">
                {t("aside.linkedin")}
              </span>
              <span className="block truncate text-sm font-medium text-muted-foreground transition-colors">
                linkedin.com/in/albert-hartanto-b92036396
              </span>
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }} href="https://github.com/eCarlsson-r" rel="noreferrer"
            className="group flex items-center gap-4 p-4 bg-secondary text-white dark:bg-white dark:text-secondary rounded-xl shadow-lg transition"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-muted-foreground">
              <Github className="w-4 h-4" />
            </span>
            
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">
                {t("aside.github")}
              </span>
              <span className="block truncate text-sm font-medium text-muted-foreground transition-colors">
                github.com/eCarlsson-r
              </span>
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }} href="resume.pdf" rel="noreferrer"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <FileDown className="h-4 w-4" />{t("aside.downloadResume")}
          </motion.a>
        </aside>
      </div>
    </section>
  );
}
