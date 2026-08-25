const Footer = () => {
  return (
    <footer className="mt-20 py-8 border-t border-primary/20 text-center">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} Vihaan Parlikar. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
