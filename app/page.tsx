"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Download,
  Languages,
  Palette,
  Shield,
  Sparkles,
  Star,
  ArrowRight,
  FileText,
  Users,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  AlertCircle,
  XCircle,
} from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "9 Indian Languages",
    description: "Create biodata in English, Hindi, Marathi, Gujarati, Bengali, Telugu, Tamil, Kannada, or Urdu",
  },
  {
    icon: Palette,
    title: "8+ Premium Templates",
    description: "Beautiful, professionally designed templates with customizable colors and borders",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download high-quality PNG or PDF files instantly, perfect for printing or sharing",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your data is safe. We don't store your personal information on our servers",
  },
];

const stats = [
  { value: "50,000+", label: "Biodatas Created" },
  { value: "9", label: "Languages" },
  { value: "8+", label: "Templates" },
  { value: "4.9/5", label: "Rating" },
];

const templates = [
  { name: "Classic Maroon", color: "#8B0000", popular: true },
  { name: "Royal Gold", color: "#D4AF37", popular: false },
  { name: "Elegant Blue", color: "#1e3a5f", popular: false },
  { name: "Traditional Orange", color: "#FF6B35", popular: true },
  { name: "Modern Purple", color: "#6B3FA0", popular: false },
  { name: "Simple Green", color: "#228B22", popular: false },
  { name: "Rose Pink", color: "#DB7093", popular: true },
  { name: "Minimalist White", color: "#333333", popular: false },
];

const services = [
  {
    title: "Marriage Biodata Maker",
    description: "Create beautiful marriage biodata with photo, personal details, family info, and more",
    price: "₹49",
    features: ["8+ Templates", "Photo Upload", "PDF Download", "All Languages"],
    href: "/create",
    primary: true,
  },
  {
    title: "Kundli Milan",
    description: "Check horoscope compatibility with detailed Ashtakoot Gun Milan report",
    price: "₹10",
    features: ["36 Gun Analysis", "Detailed Report", "Remedies", "PDF Report"],
    href: "/kundli-milan",
    primary: false,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">
              <Sparkles className="h-3 w-3 mr-1" />
              India&apos;s #1 Marriage Biodata Maker
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create Beautiful{" "}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Marriage Biodata
              </span>{" "}
              in Minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Make a stunning biodata for marriage in just 5 minutes. 8+ premium templates,
              9 languages, Kundli Milan calculator. Download instantly!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-lg px-8">
                <Link href="/create">
                  Create Free Biodata <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/kundli-milan">
                  <Heart className="mr-2 h-5 w-5 text-rose-500" />
                  Kundli Milan
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No sign-up required • Instant download • 100% Free to try
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Marriage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From creating beautiful biodatas to checking horoscope compatibility
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${service.primary ? "border-rose-200 shadow-lg" : ""}`}>
                  <CardHeader>
                    {service.primary && (
                      <Badge className="w-fit mb-2 bg-rose-500">Most Popular</Badge>
                    )}
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{service.price}</span>
                      <span className="text-gray-500 ml-1">only</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={`w-full ${service.primary ? "bg-gradient-to-r from-rose-500 to-orange-500" : ""}`} variant={service.primary ? "default" : "outline"}>
                      <Link href={service.href}>
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biodata Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-xl blur-xl"></div>
                <div className="relative bg-white rounded-lg border-4 border-rose-200 shadow-2xl p-6 max-w-sm mx-auto">
                  {/* Mini Biodata Preview */}
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">🙏</div>
                    <p className="text-rose-600 font-serif text-sm italic">|| Shree Ganeshay Namah ||</p>
                  </div>
                  <h3 className="text-center text-xl font-bold text-rose-700 border-b-2 border-rose-200 pb-2 mb-4">BIODATA</h3>

                  {/* Photo placeholder */}
                  <div className="float-right ml-4 mb-2">
                    <div className="w-20 h-24 bg-gray-100 border-2 border-rose-200 rounded flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>

                  {/* Sample details - First 4 visible */}
                  <div className="text-sm space-y-1.5 text-gray-700">
                    <p><span className="font-semibold text-rose-700">Name:</span> Priya Sharma</p>
                    <p><span className="font-semibold text-rose-700">Date of Birth:</span> 15 March 1995</p>
                    <p><span className="font-semibold text-rose-700">Height:</span> 5&apos;4&quot;</p>
                    <p><span className="font-semibold text-rose-700">Education:</span> MBA</p>
                  </div>

                  <div className="clear-both"></div>

                  {/* Blurred section */}
                  <div className="relative mt-3">
                    <div className="blur-sm select-none pointer-events-none">
                      <div className="text-sm space-y-1.5 text-gray-700">
                        <p><span className="font-semibold text-rose-700">Occupation:</span> Manager</p>
                        <p><span className="font-semibold text-rose-700">Rashi:</span> Simha (Leo)</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-rose-100 text-sm">
                        <p className="font-semibold text-rose-700 mb-1">Family Details:</p>
                        <p className="text-gray-600 text-xs">Father: Mr. Rajesh Sharma</p>
                        <p className="text-gray-600 text-xs">Mother: Mrs. Sunita Sharma</p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-rose-100 flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="h-3 w-3" /> +91 98XXX XXXXX
                        <MapPin className="h-3 w-3 ml-2" /> Delhi
                      </div>
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex items-end justify-center pb-2">
                      <Badge className="bg-rose-500 text-white shadow-lg animate-pulse">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Pay ₹49 to unlock
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">
                <FileText className="h-3 w-3 mr-1" />
                Marriage Biodata
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create Stunning Biodata in{" "}
                <span className="text-rose-500">5 Minutes</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Our easy-to-use biodata maker helps you create professional marriage biodatas
                with beautiful templates. Add your photo, personal details, family information,
                and download instantly.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "8+ professionally designed templates",
                  "Upload your photo with perfect sizing",
                  "Available in 9 Indian languages",
                  "Download as PNG or PDF instantly",
                  "Add family, education & contact details",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-orange-500">
                <Link href="/create">
                  Create Your Biodata <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kundli Milan Preview Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
                <Heart className="h-3 w-3 mr-1" />
                Kundli Milan
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Check Your{" "}
                <span className="text-orange-500">Horoscope Match</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Discover your compatibility with our accurate Ashtakoot Gun Milan calculator.
                Get detailed analysis of all 8 aspects with a maximum score of 36 points.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Complete 36-point Ashtakoot analysis",
                  "8 Koot analysis: Varna, Vashya, Tara & more",
                  "Instant compatibility score",
                  "Detailed breakdown with explanations",
                  "Recommendations based on score",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-rose-500">
                <Link href="/kundli-milan">
                  Check Compatibility <Heart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Kundli Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-xl blur-xl"></div>
                <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm mx-auto">
                  {/* Score Header */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white text-center">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">👨</div>
                        <p className="text-xs mt-1 opacity-80">Rahul</p>
                      </div>
                      <Heart className="h-6 w-6 fill-white animate-pulse" />
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">👩</div>
                        <p className="text-xs mt-1 opacity-80">Priya</p>
                      </div>
                    </div>
                    <div className="text-5xl font-bold">28/36</div>
                    <p className="text-lg font-semibold mt-1">Excellent Match!</p>
                    <p className="text-sm opacity-80">77% Compatible</p>
                  </div>

                  {/* Sample Gun Scores - First 2 visible */}
                  <div className="p-4 space-y-3">
                    {[
                      { name: "Varna", hindi: "वर्ण", score: "1/1", color: "green" },
                      { name: "Vashya", hindi: "वश्य", score: "2/2", color: "green" },
                    ].map((gun) => (
                      <div key={gun.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">{gun.name} ({gun.hindi})</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">{gun.score}</span>
                      </div>
                    ))}

                    {/* Blurred remaining scores */}
                    <div className="relative">
                      <div className="blur-sm select-none pointer-events-none space-y-3">
                        {[
                          { name: "Tara", hindi: "तारा", score: "2/3" },
                          { name: "Yoni", hindi: "योनि", score: "4/4" },
                          { name: "Graha", hindi: "ग्रह", score: "4/5" },
                          { name: "Gana", hindi: "गण", score: "5/6" },
                        ].map((gun) => (
                          <div key={gun.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">{gun.name} ({gun.hindi})</span>
                            </div>
                            <span className="text-sm font-bold text-green-600">{gun.score}</span>
                          </div>
                        ))}
                      </div>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white flex items-end justify-center pb-1">
                        <Badge className="bg-orange-500 text-white shadow-lg animate-pulse">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Pay ₹10 for full report
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">8+ Templates</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beautiful Templates for Every Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div
                    className="h-40 flex items-center justify-center"
                    style={{ backgroundColor: template.color + "15" }}
                  >
                    <div
                      className="w-24 h-32 rounded border-2 shadow-sm bg-white flex flex-col items-center justify-center p-2"
                      style={{ borderColor: template.color }}
                    >
                      <div className="text-2xl mb-1">🙏</div>
                      <div className="w-full h-1 rounded mb-1" style={{ backgroundColor: template.color }} />
                      <div className="w-full space-y-0.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-0.5 bg-gray-200 rounded" style={{ width: `${100 - i * 10}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3 text-center">
                    <p className="font-medium text-sm">{template.name}</p>
                    {template.popular && (
                      <Badge className="mt-1 text-xs bg-orange-100 text-orange-700 hover:bg-orange-100">Popular</Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/templates">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create the perfect marriage biodata
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">Create your biodata in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Fill Your Details", desc: "Enter personal, family, and contact information", icon: FileText },
              { step: "2", title: "Choose Template", desc: "Select from 8+ beautiful templates", icon: Palette },
              { step: "3", title: "Download & Share", desc: "Get your biodata in PNG or PDF format", icon: Download },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
            <p className="text-gray-600">Trusted by thousands of happy couples</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Priya Sharma", location: "Delhi", text: "Created my biodata in just 5 minutes. The templates are beautiful and very professional looking!" },
              { name: "Rahul Verma", location: "Mumbai", text: "The Kundli Milan feature is very accurate. Helped us understand our compatibility better." },
              { name: "Anjali Patel", location: "Gujarat", text: "Love that I could create biodata in Gujarati. My parents were so happy with the result!" },
            ].map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Marriage Biodata?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Join 50,000+ happy users who have created beautiful biodatas using our free tool.
            Start now - no sign-up required!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/create">
                Create Biodata Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/kundli-milan">Check Kundli Milan</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
