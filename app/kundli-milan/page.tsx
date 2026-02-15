"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Download,
  RefreshCw,
  User,
  Users,
  Settings,
  Unlock,
} from "lucide-react";
import { rashiData, nakshatraData } from "@/lib/biodata-config";
import { calculateKundliMilan, KundliResult, KundliInput } from "@/lib/kundli-calculator";

export default function KundliMilanPage() {
  const [boyData, setBoyData] = useState<KundliInput>({ name: "", rashi: "", nakshatra: 0 });
  const [girlData, setGirlData] = useState<KundliInput>({ name: "", rashi: "", nakshatra: 0 });
  const [result, setResult] = useState<KundliResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testCode, setTestCode] = useState("");
  const [testCodeDialogOpen, setTestCodeDialogOpen] = useState(false);

  const handleTestCodeSubmit = () => {
    if (testCode === "mohit@k1510") {
      setTestMode(true);
      setTestCodeDialogOpen(false);
      setTestCode("");
    } else {
      alert("Invalid code");
    }
  };

  const handleCalculate = () => {
    if (!boyData.rashi || !boyData.nakshatra || !girlData.rashi || !girlData.nakshatra) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      const kundliResult = calculateKundliMilan(boyData, girlData);
      setResult(kundliResult);
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setBoyData({ name: "", rashi: "", nakshatra: 0 });
    setGirlData({ name: "", rashi: "", nakshatra: 0 });
    setResult(null);
  };

  const getScoreIcon = (obtained: number, max: number) => {
    const percentage = (obtained / max) * 100;
    if (percentage >= 75) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (percentage >= 50) return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 py-12 relative">
        <div className="container mx-auto px-4 text-center">
          {testMode && (
            <Badge className="mb-2 bg-green-500 text-white">
              <Unlock className="h-3 w-3 mr-1" />
              TEST MODE ACTIVE - Free Reports Enabled
            </Badge>
          )}
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
            <Heart className="h-3 w-3 mr-1 fill-white" />
            Ashtakoot Gun Milan
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kundli Milan Calculator
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Check horoscope compatibility with detailed 36-point Ashtakoot Gun Milan analysis.
            Get instant results with compatibility score and recommendations.
          </p>
        </div>
        {/* Hidden Test Mode Trigger */}
        <Dialog open={testCodeDialogOpen} onOpenChange={setTestCodeDialogOpen}>
          <DialogTrigger asChild>
            <button className="absolute bottom-2 right-2 p-1 opacity-20 hover:opacity-60 transition-opacity">
              <Settings className="h-4 w-4 text-white" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Developer Mode</DialogTitle>
              <DialogDescription>
                Enter the test code to unlock all features for testing.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter test code"
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTestCodeSubmit()}
              />
              <Button onClick={handleTestCodeSubmit} className="w-full">
                <Unlock className="mr-2 h-4 w-4" />
                Unlock Test Mode
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <div className="container mx-auto px-4 py-8">
        {!result ? (
          /* Input Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Boy's Details */}
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <User className="h-5 w-5" />
                    Boy&apos;s Details (वर)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>Name (Optional)</Label>
                    <Input
                      placeholder="Enter boy's name"
                      value={boyData.name}
                      onChange={(e) => setBoyData({ ...boyData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Rashi (राशि) *</Label>
                    <Select
                      value={boyData.rashi}
                      onValueChange={(value) => setBoyData({ ...boyData, rashi: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Rashi" />
                      </SelectTrigger>
                      <SelectContent>
                        {rashiData.map((rashi) => (
                          <SelectItem key={rashi.id} value={rashi.id}>
                            {rashi.name} ({rashi.hindi})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nakshatra (नक्षत्र) *</Label>
                    <Select
                      value={boyData.nakshatra.toString()}
                      onValueChange={(value) => setBoyData({ ...boyData, nakshatra: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Nakshatra" />
                      </SelectTrigger>
                      <SelectContent>
                        {nakshatraData.map((nakshatra) => (
                          <SelectItem key={nakshatra.id} value={nakshatra.id.toString()}>
                            {nakshatra.name} ({nakshatra.hindi})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Girl's Details */}
              <Card className="border-pink-200">
                <CardHeader className="bg-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-pink-700">
                    <Users className="h-5 w-5" />
                    Girl&apos;s Details (कन्या)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>Name (Optional)</Label>
                    <Input
                      placeholder="Enter girl's name"
                      value={girlData.name}
                      onChange={(e) => setGirlData({ ...girlData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Rashi (राशि) *</Label>
                    <Select
                      value={girlData.rashi}
                      onValueChange={(value) => setGirlData({ ...girlData, rashi: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Rashi" />
                      </SelectTrigger>
                      <SelectContent>
                        {rashiData.map((rashi) => (
                          <SelectItem key={rashi.id} value={rashi.id}>
                            {rashi.name} ({rashi.hindi})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Nakshatra (नक्षत्र) *</Label>
                    <Select
                      value={girlData.nakshatra.toString()}
                      onValueChange={(value) => setGirlData({ ...girlData, nakshatra: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Nakshatra" />
                      </SelectTrigger>
                      <SelectContent>
                        {nakshatraData.map((nakshatra) => (
                          <SelectItem key={nakshatra.id} value={nakshatra.id.toString()}>
                            {nakshatra.name} ({nakshatra.hindi})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 px-12"
              >
                {isCalculating ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Check Compatibility
                  </>
                )}
              </Button>
            </div>

            {/* Info Card */}
            <Card className="mt-8 bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-amber-800 mb-2">About Ashtakoot Gun Milan</h3>
                <p className="text-sm text-amber-700">
                  Ashtakoot Gun Milan is a traditional Vedic astrology method to assess marriage compatibility.
                  It evaluates 8 aspects (Koots) with a maximum of 36 points. A score of 18+ is considered acceptable,
                  21+ is good, and 28+ is excellent for marriage.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Score Card */}
            <Card className="mb-6 overflow-hidden">
              <div
                className="p-6 text-white text-center"
                style={{ backgroundColor: result.verdictColor }}
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm opacity-80">{boyData.name || "Boy"}</p>
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                      👨
                    </div>
                  </div>
                  <Heart className="h-8 w-8 fill-white animate-pulse" />
                  <div className="text-center">
                    <p className="text-sm opacity-80">{girlData.name || "Girl"}</p>
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                      👩
                    </div>
                  </div>
                </div>
                <div className="text-6xl font-bold mb-2">
                  {result.totalPoints}/{result.maxPoints}
                </div>
                <p className="text-2xl font-semibold mb-1">{result.verdict}</p>
                <p className="text-sm opacity-80">{result.percentage}% Compatible</p>
              </div>
              <CardContent className="pt-6">
                <p className="text-gray-600">{result.recommendation}</p>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Gun Analysis (विस्तृत गुण विवरण)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.guns.map((gun, index) => (
                    <motion.div
                      key={gun.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getScoreIcon(gun.obtainedPoints, gun.maxPoints)}
                          <div>
                            <p className="font-semibold">
                              {gun.name} ({gun.hindi})
                            </p>
                            <p className="text-sm text-gray-500">{gun.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            <span style={{ color: gun.obtainedPoints >= gun.maxPoints * 0.5 ? "#22c55e" : "#ef4444" }}>
                              {gun.obtainedPoints}
                            </span>
                            <span className="text-gray-400">/{gun.maxPoints}</span>
                          </p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(gun.obtainedPoints / gun.maxPoints) * 100}%`,
                            backgroundColor: gun.obtainedPoints >= gun.maxPoints * 0.5 ? "#22c55e" : "#ef4444",
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{gun.details}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Another Match
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-rose-500 to-orange-500">
                <Download className="mr-2 h-4 w-4" />
                {testMode ? "Download Report (Free)" : "Download Report (₹10)"}
              </Button>
            </div>

            {/* Pricing Info */}
            {testMode ? (
              <Card className="mt-6 border-green-300 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-700">Test Mode Active</p>
                      <p className="text-sm text-green-600">All downloads are free</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 text-white">
                        <Unlock className="h-3 w-3 mr-1" />
                        Unlocked
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mt-6 border-rose-200 bg-rose-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Get Detailed PDF Report</p>
                      <p className="text-sm text-gray-600">Complete analysis with remedies</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-rose-500">₹10</p>
                      <p className="text-xs text-gray-500">one-time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>

      {/* Score Guide */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Compatibility Score Guide</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { range: "28-36", label: "Excellent", color: "#22c55e", desc: "Highly compatible" },
              { range: "21-27", label: "Good", color: "#84cc16", desc: "Good compatibility" },
              { range: "18-20", label: "Average", color: "#eab308", desc: "Acceptable match" },
              { range: "0-17", label: "Low", color: "#ef4444", desc: "Needs remedies" },
            ].map((item) => (
              <Card key={item.range} className="text-center">
                <CardContent className="pt-6">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.range}
                  </div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
