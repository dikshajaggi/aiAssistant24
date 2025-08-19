import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-textdark py-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition"><Link to="/about">About Us</Link></li>
            <li className="text-gray-400 hover:text-white transition"><Link to="/terms">Terms of Service</Link></li>
            <li className="text-gray-400 hover:text-white transition"><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition"><Link to="/features">Features</Link></li>
            <li className="text-gray-400 hover:text-white transition"><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 hover:text-white transition"><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
          <div className="flex space-x-4">
            <Link to="#">
              <Instagram size={22} className="text-gray-400 hover:text-white transition" />
            </Link>
            <Link to="#">
              <Facebook size={22} className="text-gray-400 hover:text-white transition" />
            </Link>
            <Link to="#">
              <Linkedin size={22} className="text-gray-400 hover:text-white transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-primary">SmileLytics</span>. All rights reserved.
      </div>
    </footer>
  );
}
