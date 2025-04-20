// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Calendar, MessageSquare, Search, Hospital, User, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">HealthConnect</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-primary">How It Works</Link>
            <Link href="#providers" className="text-gray-600 hover:text-primary">For Providers</Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-primary">Login</Link>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Quality Healthcare, <span className="text-primary">Just a Click Away</span>
              </h1>
              <p className="text-lg text-gray-700 md:pr-12">
                Connect with trusted healthcare providers, book appointments, and receive medical consultations online or in-person.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/search">
                    Find Doctors
                    <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-200 rounded-full opacity-30 mix-blend-multiply filter blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-purple-200 rounded-full opacity-30 mix-blend-multiply filter blur-xl"></div>
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Healthcare professionals" 
                  className="relative rounded-lg shadow-lg z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Features Designed for Your Health Journey</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform provides everything you need to manage your healthcare experience efficiently and effectively.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Specialists</h3>
                <p className="text-gray-600">
                  Search for doctors and healthcare providers based on location, specialty, and availability.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
                <p className="text-gray-600">
                  Book appointments online with just a few clicks and manage your upcoming visits.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Teleconsultation</h3>
                <p className="text-gray-600">
                  Connect with healthcare providers remotely through our secure messaging platform.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Hospital className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resource Tracking</h3>
                <p className="text-gray-600">
                  Check availability of hospital beds, equipment, and other medical resources in real-time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-red-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
                <p className="text-gray-600">
                  Access your medical history, past appointments, and treatment records securely.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-teal-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
                <p className="text-gray-600">
                  Your data is secure with our HIPAA-compliant platform and advanced security measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Getting started with HealthConnect is simple and straightforward.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
                <p className="text-gray-600">Register and complete your health profile with relevant information.</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-lg font-semibold mb-2">Find Healthcare Providers</h3>
                <p className="text-gray-600">Search for specialists or facilities based on your needs and location.</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-lg font-semibold mb-2">Book Appointments</h3>
                <p className="text-gray-600">Schedule in-person visits or teleconsultations at your convenience.</p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="text-lg font-semibold mb-2">Receive Care</h3>
                <p className="text-gray-600">Get the care you need and maintain your health records in one place.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Providers Section */}
        <section id="providers" className="py-16 bg-gradient-to-r from-primary/5 to-primary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Healthcare providers" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold">For Healthcare Providers</h2>
                <p className="text-lg text-gray-700">
                  Join our network of trusted healthcare professionals and connect with patients seeking your expertise.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expand your practice with new patient connections</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Manage appointments and scheduling efficiently</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide teleconsultations for remote patients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maintain digital records of patient interactions</span>
                  </li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/auth/register?role=provider">
                    Join as a Provider
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Healthcare?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from our healthcare platform.
            </p>
            <Button size="lg" variant="secondary" className="mx-2" asChild>
              <Link href="/auth/register">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="mx-2 bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/search">
                Browse Doctors
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">HealthConnect</h3>
              <p className="mb-4">Connecting patients with quality healthcare providers for better health outcomes.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="#providers" className="hover:text-white">For Providers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/health-tips" className="hover:text-white">Health Tips</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li>contact@healthconnect.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Health Street, Medical City</li>
                <li className="flex space-x-4 pt-4">
                  <a href="#" className="hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                  <a href="#" className="hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a>
                  <a href="#" className="hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-4">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-white">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}