    import React from "react";

    function Footer() {
    return (
        <footer className="mt-20 bg-gray-100 text-gray-700 py-10 px-6 md:px-20 lg:px-44">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Trip-Planner</h3>
            <p className="text-sm text-gray-600">
                Crafting AI-powered itineraries to make every trip unforgettable.
                Travel smart, travel beautifully.
            </p>
            </div>

            {/* Quick Links */}
            <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
                <li>
                <a href="/" className="hover:underline">
                    Home
                </a>
                </li>
                <li>
                <a href="/about" className="hover:underline">
                    About Us
                </a>
                </li>
                <li>
                <a href="/faq" className="hover:underline">
                    FAQs
                </a>
                </li>
                <li>
                <a href="/contact" className="hover:underline">
                    Contact
                </a>
                </li>
            </ul>
            </div>

            {/* Resources */}
            <div>
            <h4 className="text-lg font-semibold mb-2">Resources</h4>
            <ul className="space-y-1 text-sm">
                <li>
                <a href="/privacy" className="hover:underline">
                    Privacy Policy
                </a>
                </li>
                <li>
                <a href="/terms" className="hover:underline">
                    Terms of Use
                </a>
                </li>
                <li>
                <a href="/blog" className="hover:underline">
                    Travel Blog
                </a>
                </li>
            </ul>
            </div>

            {/* Social */}
            <div>
            <h4 className="text-lg font-semibold mb-2">Connect with Us</h4>
            <div className="flex gap-4 text-xl">
                <a href="#" className="hover:text-blue-600">
                🌐
                </a>
                <a href="#" className="hover:text-blue-400">
                🐦
                </a>
                <a href="#" className="hover:text-pink-500">
                📸
                </a>
                <a href="#" className="hover:text-blue-800">
                💼
                </a>
            </div>
            </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI-Trip-Planner. All rights reserved.
        </div>
        </footer>
    );
    }

    export default Footer;
