import React from "react";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 " >
                            <h3 className="text-2xl font-bold text-white">
                                DevSkillLabs
                            </h3>
                            <p className="text-gray-300 mt-3 max-w-md">
                                The most data-driven resource to understand market demands for software engineering.
                                Make informed career decisions with real job posting insights.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                                    <ExternalLink size={14} className="mr-2" />
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                                    <ExternalLink size={14} className="mr-2" />
                                    Data Sources
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                                    <ExternalLink size={14} className="mr-2" />
                                    Methodology
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center">
                                    <ExternalLink size={14} className="mr-2" />
                                    API Documentation
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-300">
                                <Mail size={16} className="mr-3 text-purple-400" />
                                <span>hello@devskilllabs.com</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <MapPin size={16} className="mr-3 text-purple-400" />
                                <span>San Francisco, CA</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Phone size={16} className="mr-3 text-purple-400" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="max-w-md mx-auto text-center">
                        <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
                        <p className="text-gray-300 mb-4">
                            Get the latest job market insights delivered to your inbox.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="px-6 py-2  rounded-lg bg-white text-black transition-all font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            © 2024 DevSkillLabs. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
