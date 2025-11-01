interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = "" }: SectionTitleProps) => {
  return (
    <h3 className={`text-2xl md:text-3xl font-semibold mb-8 ${className}`}>
      <span className="text-primary">//</span> {children}
    </h3>
  );
};

export default SectionTitle;
