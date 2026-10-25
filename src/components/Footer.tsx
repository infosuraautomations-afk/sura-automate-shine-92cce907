import logo from "@/assets/sura-logo-wide-fixed.png.asset.json";

export const Footer = () => (
  <footer className="bg-secondary/50 border-t border-border py-8">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <img src={logo.url} alt="Sura Automations" width={672} height={279} loading="lazy" className="w-28 h-12 object-contain rounded-sm" />
        <p className="text-sm text-muted-foreground max-w-44 leading-relaxed">Websites, chatbots, and useful connections.</p>
      </div>
      <p className="text-xs text-muted-foreground text-center sm:text-right leading-relaxed">© 2026 Sura Automations.<br />Developed by Suraj Bishwokarma.</p>
    </div>
  </footer>
);