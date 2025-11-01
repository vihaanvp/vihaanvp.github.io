import { useToast } from "@/hooks/use-toast";

const SocialLinks = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${label}: ${text}`,
    });
  };

  const socials = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      href: "https://github.com/vihaanvp",
      external: true,
    },
    {
      name: "Discord",
      icon: "fab fa-discord",
      onClick: () => copyToClipboard("vihaanvp", "Discord username"),
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      href: "https://instagram.com/vihaanvp",
      external: true,
    },
    {
      name: "E-mail",
      icon: "fa fa-envelope",
      onClick: () => copyToClipboard("vihaan@vihaanvp.me", "Email"),
    },
    {
      name: "X",
      icon: "fa-brands fa-x-twitter",
      href: "https://x.com/vihaanvp_yt",
      external: true,
    },
    {
      name: "YouTube",
      icon: "fa-brands fa-youtube",
      href: "https://youtube.com/@vihaanvp",
      external: true,
    },
    {
      name: "Steam",
      icon: "fab fa-steam",
      href: "https://steamcommunity.com/id/vihaanvp/",
      external: true,
    },
    {
      name: "NameMC",
      icon: "fa-solid fa-gem",
      href: "https://namemc.com/profile/VihaanVP.2",
      external: true,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          onClick={social.onClick}
          target={social.external ? "_blank" : undefined}
          rel={social.external ? "noopener noreferrer" : undefined}
          className="group relative px-4 py-2 bg-card border border-primary/30 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer overflow-hidden"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <div className="relative flex items-center gap-2 text-sm font-medium">
            <i className={`${social.icon} text-primary`}></i>
            <span>{social.name}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
