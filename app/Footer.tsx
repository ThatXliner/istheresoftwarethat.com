import { Github, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-400">
                IsThereSoftware
              </span>
              <span className="text-xl font-bold text-white">That.com</span>
            </Link>
            <p className="mt-4 text-slate-400">
              Discover the perfect free and open-source software for your needs.
            </p>
            <div className="flex mt-6 space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                {/* X, (formerly Twitter) */}
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              <FooterLink to="/search" label="All Software" />
              <FooterLink
                to="/search?category=productivity"
                label="Productivity"
              />
              <FooterLink
                to="/search?category=development"
                label="Development"
              />
              <FooterLink to="/search?category=design" label="Design" />
              <FooterLink
                to="/search?category=communication"
                label="Communication"
              />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/faq" label="FAQ" />
              {/* <FooterLink to="/blog" label="Blog" /> */}
              {/* <FooterLink to="/submit" label="Submit Software" /> */}
              {/* <FooterLink to="/compare" label="Compare Tools" /> */}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/cookies" label="Cookie Policy" />
              <FooterLink to="/licenses" label="Licenses" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 IsThereSoftwareThat.com. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm">
            Made with ❤️ for open-source software
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink = ({ to, label }: FooterLinkProps) => (
  <li>
    <Link
      href={to}
      className="text-slate-400 hover:text-white transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
