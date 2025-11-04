import React from "react";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import logo from "../../assets/logo.jpg"; // or use /assets/logo.png if in public/

const SocialIcon = ({ href, label, children }) => (
    <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 ring-1 ring-white/20 hover:opacity-90"
    >
        {children}
    </a>
);
const Footer = () => {
    return (
        <footer className="bg-[#051F33] text-white">
            <div className="mx-auto max-w-7xl px-6 py-6">
                {/* Top row */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    {/* Logo + brand */}
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="HERO.IO" className="h-8 w-auto" />
                        <span className="font-semibold tracking-wide">Nexaur Properties</span>
                    </div>

                    {/* Socials */}
                    <div className="w-full md:w-auto md:text-right">
                        <p className="mb-3 text-xl text-gray-300">Social Links</p>
                        <div className="flex items-center gap-3 md:justify-end">
                            <SocialIcon href="https://twitter.com" label="X (Twitter)">
                                <Twitter className="h-4 w-4" />
                            </SocialIcon>
                            <SocialIcon href="https://linkedin.com" label="LinkedIn">
                                <Linkedin className="h-4 w-4" />
                            </SocialIcon>
                            <SocialIcon href="https://facebook.com" label="Facebook">
                                <Facebook className="h-4 w-4" />
                            </SocialIcon>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-white/10" />

                {/* Bottom copyright */}
                <p className="text-center text-md text-gray-300">
                    Copyright © 2025 – All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;