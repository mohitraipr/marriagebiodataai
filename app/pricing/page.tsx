"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  FileText,
  Download,
  Languages,
  Palette,
  Shield,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const pricingPlans = [
  {
    name: "Biodata Creator",
    price: "₹49",
    description: "Create beautiful marriage biodata with all features",
    features: [
      "8+ Premium Templates",
      "Photo Upload & Resize",
      "9 Indian Languages",
      "Download PNG & PDF",
      "All Personal Details Fields",
      "Family Information Section",
      "Contact Details",
      "Partner Expectations",
      "Unlimited Edits Before Download",
      "High Resolution Output",
    ],
    href: "/create",
    primary: true,
    icon: FileText,
  },
  {
    name: "Kundli Milan",
    price: "₹10",
    description: "Check horoscope compatibility with detailed report",
    features: [
      "36 Point Ashtakoot Analysis",
      "All 8 Koots Evaluated",
      "Detailed Score Breakdown",
      "Compatibility Percentage",
      "Expert Recommendations",
      "Download PDF Report",
      "Remedies if Score is Low",
      "Print Ready Format",
    ],
    href: "/kundli-milan",
    primary: false,
    icon: Heart,
  },
];

const faqs = [
  {
    question: "Is it free to create biodata?",
    answer: "Yes! You can create and preview your biodata completely free. You only pay ₹49 when you want to download the final PNG or PDF file.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods through Razorpay including UPI, Credit/Debit Cards, Net Banking, and Wallets.",
  },
  {
    question: "Can I edit after payment?",
    answer: "Yes, you can edit your biodata and download again within 24 hours of your purchase.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We don't store your personal information on our servers. Your data is only used to generate your biodata and is not shared with anyone.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "We offer a 100% satisfaction guarantee. If you're not happy with the result, contact us within 24 hours for a full refund.",
  },
  {
    question: "Is Kundli Milan accurate?",
    answer: "Our Kundli Milan uses traditional Ashtakoot Gun Milan method as per Vedic astrology, calculating all 8 koots based on your Rashi and Nakshatra.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Simple Pricing
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Affordable Pricing for Everyone
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            No hidden fees. No subscriptions. Pay only when you download.
            Try everything free before you pay!
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`h-full relative overflow-hidden ${plan.primary ? "border-rose-300 shadow-xl" : ""}`}>
                  {plan.primary && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-rose-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.primary ? "bg-gradient-to-br from-rose-500 to-orange-500" : "bg-gradient-to-br from-orange-500 to-rose-500"}`}>
                        <plan.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-2">one-time</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full ${plan.primary ? "bg-gradient-to-r from-rose-500 to-orange-500" : ""}`}
                      variant={plan.primary ? "default" : "outline"}
                      size="lg"
                    >
                      <Link href={plan.href}>
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

      {/* Why Pay Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Get</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pricing is simple and transparent. Here's everything included.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Download,
                title: "Instant Download",
                desc: "Get your biodata immediately after payment",
              },
              {
                icon: Palette,
                title: "All Templates",
                desc: "Access to all 8+ premium templates",
              },
              {
                icon: Languages,
                title: "9 Languages",
                desc: "Create in any Indian language",
              },
              {
                icon: Shield,
                title: "100% Secure",
                desc: "Your data is never stored or shared",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compare & Save</h2>
              <p className="text-gray-600">
                See how much you save compared to traditional methods
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center p-6 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Traditional Way</h3>
                    <div className="text-3xl font-bold text-gray-700 mb-4">₹500-2000</div>
                    <ul className="text-sm text-gray-600 space-y-2 text-left">
                      <li>• Visit printing shop</li>
                      <li>• Wait 2-3 days</li>
                      <li>• Limited designs</li>
                      <li>• Pay for each edit</li>
                      <li>• No digital copy</li>
                    </ul>
                  </div>
                  <div className="text-center p-6 bg-rose-50 rounded-lg border-2 border-rose-200">
                    <h3 className="font-semibold text-lg mb-2 text-rose-700">Our Platform</h3>
                    <div className="text-3xl font-bold text-rose-500 mb-4">₹49</div>
                    <ul className="text-sm text-gray-700 space-y-2 text-left">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Create from home
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Ready in 5 minutes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        8+ premium templates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Unlimited edits
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        PNG + PDF included
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                    Save up to 97%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Got questions? We've got answers.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <HelpCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Creating for Free
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            No payment required to start. Create your biodata, preview it,
            and only pay when you're 100% satisfied.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/create">
                Create Biodata <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/kundli-milan">Check Kundli Milan</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
