"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, CheckCircle2, User, Phone, MapPin } from "lucide-react";
import { biodataTemplates } from "@/lib/biodata-config";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
            <Palette className="h-3 w-3 mr-1" />
            Premium Templates
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Beautiful Marriage Biodata Templates
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Choose from our collection of 8+ professionally designed templates.
            Each template is crafted to make your biodata stand out.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {biodataTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Template Preview */}
                  <div
                    className="p-4 h-80 flex items-center justify-center"
                    style={{ backgroundColor: template.bgColor }}
                  >
                    <div
                      className="w-full max-w-[200px] bg-white rounded shadow-lg p-3 transform group-hover:scale-105 transition-transform duration-300"
                      style={{ borderColor: template.borderColor, borderWidth: "3px", borderStyle: "solid" }}
                    >
                      {/* Mini Biodata */}
                      <div className="text-center mb-2">
                        <div className="text-xl mb-1">🙏</div>
                        <p className="text-[8px] italic" style={{ color: template.accentColor }}>
                          || Shree Ganeshay Namah ||
                        </p>
                      </div>
                      <h4
                        className="text-center text-xs font-bold border-b pb-1 mb-2"
                        style={{ color: template.headerBg, borderColor: template.borderColor }}
                      >
                        BIODATA
                      </h4>

                      <div className="float-right ml-2 mb-1">
                        <div
                          className="w-10 h-12 rounded flex items-center justify-center"
                          style={{ backgroundColor: template.bgColor, borderColor: template.borderColor, borderWidth: "1px", borderStyle: "solid" }}
                        >
                          <User className="w-5 h-5" style={{ color: template.accentColor }} />
                        </div>
                      </div>

                      <div className="text-[7px] space-y-0.5" style={{ color: template.textColor }}>
                        <p><span className="font-semibold" style={{ color: template.headerBg }}>Name:</span> Sample Name</p>
                        <p><span className="font-semibold" style={{ color: template.headerBg }}>DOB:</span> 15 Mar 1995</p>
                        <p><span className="font-semibold" style={{ color: template.headerBg }}>Height:</span> 5'6"</p>
                        <p><span className="font-semibold" style={{ color: template.headerBg }}>Education:</span> MBA</p>
                        <p><span className="font-semibold" style={{ color: template.headerBg }}>Rashi:</span> Simha</p>
                      </div>

                      <div className="clear-both"></div>

                      <div className="mt-2 pt-1 border-t text-[6px]" style={{ borderColor: template.borderColor, color: template.textColor }}>
                        <p className="font-semibold" style={{ color: template.headerBg }}>Family:</p>
                        <p className="opacity-75">Father: Mr. Sharma</p>
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <CardContent className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <p className="text-sm text-gray-500">Professional design</p>
                      </div>
                      {index < 3 && (
                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">Popular</Badge>
                      )}
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex gap-1">
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: template.headerBg }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: template.accentColor }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: template.bgColor }} />
                      </div>
                    </div>

                    <Button asChild className="w-full bg-gradient-to-r from-rose-500 to-orange-500">
                      <Link href="/create">
                        Use This Template <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Our Templates Stand Out</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every template is designed with care to make your biodata perfect
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Professional Design",
                desc: "Clean, modern layouts that make a great first impression",
              },
              {
                title: "Print Ready",
                desc: "High-resolution output perfect for printing or sharing digitally",
              },
              {
                title: "Customizable",
                desc: "Choose your template, add photo, and personalize content",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Pick any template and start creating your beautiful marriage biodata now.
            It only takes 5 minutes!
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/create">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
