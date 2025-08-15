import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="!hover:text-white transition">About Us</Link></li>
            <li><Link to="/terms" className="!hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="!hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><Link to="/features" className="!hover:text-white transition">Features</Link></li>
            <li><Link to="/pricing" className="!hover:text-white transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="!hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
          <div className="flex space-x-4">
            <Link to="#" className="!hover:text-white transition">
              <Instagram size={22} />
            </Link>
            <Link to="#" className="!hover:text-white transition">
              <Facebook size={22} />
            </Link>
            <Link to="#" className="!hover:text-white transition">
              <Linkedin size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </footer>
  );
}
