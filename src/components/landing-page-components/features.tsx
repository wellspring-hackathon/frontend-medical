import { Calendar, Hospital, MessageSquare, Search, Shield, User } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section id="features" className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Features Designed for Your Health Journey</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Our platform provides everything you need to manage your healthcare experience efficiently and effectively.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className=" p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className=" p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Find Specialists</h3>
          <p className="text-muted-foreground">
            Search for doctors and healthcare providers based on location, specialty, and availability.
          </p>
        </div>

        {/* Feature 2 */}
        <div className=" p-6 rounded-xl border  shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
          <p className="text-muted-foreground">
            Book appointments online with just a few clicks and manage your upcoming visits.
          </p>
        </div>

        {/* Feature 3 */}
        <div className=" p-6 rounded-xl border  shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-purple-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Teleconsultation</h3>
          <p className="text-muted-foreground">
            Connect with healthcare providers remotely through our secure messaging platform.
          </p>
        </div>

        {/* Feature 4 */}
        <div className=" p-6 rounded-xl bordershadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Hospital className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Resource Tracking</h3>
          <p className="text-muted-foreground">
            Check availability of hospital beds, equipment, and other medical resources in real-time.
          </p>
        </div>

        {/* Feature 5 */}
        <div className=" p-6 rounded-xl border  shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-red-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <User className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
          <p className="text-muted-foreground">
            Access your medical history, past appointments, and treatment records securely.
          </p>
        </div>

        {/* Feature 6 */}
        <div className=" p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-teal-100 p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Shield className="h-6 w-6 text-teal-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
          <p className="text-muted-foreground">
            Your data is secure with our HIPAA-compliant platform and advanced security measures.
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features