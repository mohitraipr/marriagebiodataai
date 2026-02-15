"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Download,
  FileImage,
  FileText,
  Upload,
  User,
  Users,
  Phone,
  RefreshCw,
  Eye,
  Loader2,
  CheckCircle2,
  Settings,
  Unlock,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  languages,
  godImages,
  rashiData,
  nakshatraData,
  gotraOptions,
  nadiOptions,
  ganOptions,
  complexionOptions,
  heightOptions,
  bloodGroupOptions,
  biodataTemplates,
  BiodataTemplate,
} from "@/lib/biodata-config";

interface FormData {
  [key: string]: string;
}

export default function CreateBiodataPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedTemplate, setSelectedTemplate] = useState<BiodataTemplate>(biodataTemplates[0]);
  const [selectedGod, setSelectedGod] = useState(godImages[0]);
  const [formData, setFormData] = useState<FormData>({});
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testCode, setTestCode] = useState("");
  const [testCodeDialogOpen, setTestCodeDialogOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTestCodeSubmit = () => {
    if (testCode === "mohit@k1510") {
      setTestMode(true);
      setTestCodeDialogOpen(false);
      setTestCode("");
    } else {
      alert("Invalid code");
    }
  };

  const handleInputChange = useCallback((fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({});
    setProfilePhoto(null);
    setSelectedTemplate(biodataTemplates[0]);
    setSelectedGod(godImages[0]);
  };

  const handleDownload = async (format: "png" | "pdf") => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      const { toPng } = await import("html-to-image");

      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: selectedTemplate.bgColor,
      });

      if (format === "png") {
        const link = document.createElement("a");
        link.download = `biodata-${formData.name || "marriage"}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const jsPDF = (await import("jspdf")).default;
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => { img.onload = resolve; });

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [img.width / 2, img.height / 2],
        });
        pdf.addImage(dataUrl, "PNG", 0, 0, img.width / 2, img.height / 2);
        pdf.save(`biodata-${formData.name || "marriage"}.pdf`);
      }
    } catch (error) {
      console.error("Error generating file:", error);
      alert("Error generating file. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const personalFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { id: "dob", label: "Date of Birth", type: "date" },
    { id: "timeOfBirth", label: "Time of Birth", type: "text", placeholder: "e.g., 10:30 AM" },
    { id: "placeOfBirth", label: "Place of Birth", type: "text", placeholder: "City, State" },
    { id: "religion", label: "Religion", type: "text", placeholder: "e.g., Hindu" },
    { id: "caste", label: "Caste/Community", type: "text", placeholder: "Enter caste" },
    { id: "gotra", label: "Gotra", type: "select", options: gotraOptions },
    { id: "rashi", label: "Rashi (Zodiac)", type: "select", options: rashiData.map(r => r.name) },
    { id: "nakshatra", label: "Nakshatra", type: "select", options: nakshatraData.map(n => n.name) },
    { id: "nadi", label: "Nadi", type: "select", options: nadiOptions },
    { id: "gan", label: "Gan", type: "select", options: ganOptions },
    { id: "manglik", label: "Manglik Status", type: "select", options: ["Non-Manglik", "Manglik", "Anshik Manglik"] },
    { id: "height", label: "Height", type: "select", options: heightOptions },
    { id: "weight", label: "Weight", type: "text", placeholder: "e.g., 65 kg" },
    { id: "complexion", label: "Complexion", type: "select", options: complexionOptions },
    { id: "bloodGroup", label: "Blood Group", type: "select", options: bloodGroupOptions },
    { id: "education", label: "Education", type: "text", placeholder: "e.g., B.Tech, MBA" },
    { id: "occupation", label: "Occupation", type: "text", placeholder: "Job title & company" },
    { id: "income", label: "Annual Income", type: "text", placeholder: "e.g., 8-10 LPA" },
    { id: "hobbies", label: "Hobbies & Interests", type: "text", placeholder: "e.g., Reading, Music" },
  ];

  const familyFields = [
    { id: "fatherName", label: "Father's Name", placeholder: "Enter father's name" },
    { id: "fatherOccupation", label: "Father's Occupation", placeholder: "Occupation" },
    { id: "motherName", label: "Mother's Name", placeholder: "Enter mother's name" },
    { id: "motherOccupation", label: "Mother's Occupation", placeholder: "Occupation" },
    { id: "brothers", label: "Brothers", placeholder: "e.g., 1 Elder (Married)" },
    { id: "sisters", label: "Sisters", placeholder: "e.g., 1 Younger" },
    { id: "familyType", label: "Family Type", placeholder: "Joint/Nuclear" },
    { id: "familyStatus", label: "Family Status", placeholder: "Middle Class" },
    { id: "nativePlace", label: "Native Place", placeholder: "Village/City" },
    { id: "familyValues", label: "Family Values", placeholder: "Traditional/Moderate" },
  ];

  const contactFields = [
    { id: "address", label: "Address", placeholder: "Full residential address" },
    { id: "mobile", label: "Mobile Number", placeholder: "+91 XXXXXXXXXX" },
    { id: "alternatePhone", label: "Alternate Phone", placeholder: "+91 XXXXXXXXXX" },
    { id: "email", label: "Email", placeholder: "email@example.com" },
  ];

  const expectationFields = [
    { id: "expectedAge", label: "Expected Age", placeholder: "e.g., 25-30 years" },
    { id: "expectedHeight", label: "Expected Height", placeholder: "e.g., 5'4\" - 5'8\"" },
    { id: "expectedEducation", label: "Expected Education", placeholder: "Graduate or above" },
    { id: "expectedOccupation", label: "Expected Occupation", placeholder: "Any profession" },
    { id: "otherExpectations", label: "Other Expectations", placeholder: "Any other preferences" },
  ];

  const filledFieldsCount = Object.values(formData).filter(v => v).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 py-8 relative">
        <div className="container mx-auto px-4 text-center">
          {testMode && (
            <Badge className="mb-2 bg-green-500 text-white">
              <Unlock className="h-3 w-3 mr-1" />
              TEST MODE ACTIVE - Free Downloads Enabled
            </Badge>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Create Your Marriage Biodata
          </h1>
          <p className="text-white/90">
            Fill in your details, choose a template, and download instantly
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
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Form (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Form Progress</span>
                  <span className="text-sm text-gray-500">{filledFieldsCount} fields filled</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${Math.min((filledFieldsCount / 20) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Language & Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Choose Template & Language</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div>
                  <Label className="mb-2 block">Select Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name} ({lang.nativeName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Templates */}
                <div>
                  <Label className="mb-2 block">Select Template</Label>
                  <div className="grid grid-cols-4 gap-3">
                    {biodataTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                          selectedTemplate.id === template.id
                            ? "border-rose-500 ring-2 ring-rose-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className="h-20 flex items-center justify-center"
                          style={{ backgroundColor: template.bgColor }}
                        >
                          <div
                            className="w-12 h-16 rounded border bg-white flex flex-col items-center justify-center"
                            style={{ borderColor: template.borderColor }}
                          >
                            <div className="text-xs">🙏</div>
                            <div className="w-8 h-0.5 mt-1" style={{ backgroundColor: template.headerBg }} />
                          </div>
                        </div>
                        <p className="text-xs text-center py-1 bg-white">{template.name.split(" ")[0]}</p>
                        {selectedTemplate.id === template.id && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* God/Blessing */}
                <div>
                  <Label className="mb-2 block">God/Blessing Icon</Label>
                  <div className="flex flex-wrap gap-2">
                    {godImages.map((god) => (
                      <button
                        key={god.id}
                        onClick={() => setSelectedGod(god)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedGod.id === god.id
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title={god.name}
                      >
                        <span className="text-2xl">{god.symbol}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{selectedGod.mantra}</p>
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Profile Photo (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-rose-400 transition-colors"
                >
                  {profilePhoto ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mb-2"
                      />
                      <p className="text-sm text-gray-500">Click to change photo</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Click to upload your photo</p>
                      <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Form Sections */}
            <Accordion type="multiple" defaultValue={["personal"]} className="space-y-4">
              {/* Personal Details */}
              <AccordionItem value="personal" className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <span className="flex items-center gap-2 font-semibold">
                    <User className="h-5 w-5 text-rose-500" />
                    Personal Details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {personalFields.map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="text-sm">{field.label}</Label>
                        {field.type === "select" ? (
                          <Select
                            value={formData[field.id] || ""}
                            onValueChange={(value) => handleInputChange(field.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Family Details */}
              <AccordionItem value="family" className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <span className="flex items-center gap-2 font-semibold">
                    <Users className="h-5 w-5 text-rose-500" />
                    Family Details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {familyFields.map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="text-sm">{field.label}</Label>
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Contact Details */}
              <AccordionItem value="contact" className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <span className="flex items-center gap-2 font-semibold">
                    <Phone className="h-5 w-5 text-rose-500" />
                    Contact Details
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {contactFields.map((field) => (
                      <div key={field.id} className={field.id === "address" ? "md:col-span-2" : ""}>
                        <Label htmlFor={field.id} className="text-sm">{field.label}</Label>
                        {field.id === "address" ? (
                          <textarea
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          />
                        ) : (
                          <Input
                            id={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Expectations */}
              <AccordionItem value="expectations" className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <span className="flex items-center gap-2 font-semibold">
                    <Eye className="h-5 w-5 text-rose-500" />
                    Partner Expectations (Optional)
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {expectationFields.map((field) => (
                      <div key={field.id} className={field.id === "otherExpectations" ? "md:col-span-2" : ""}>
                        <Label htmlFor={field.id} className="text-sm">{field.label}</Label>
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Reset Button */}
            <Button variant="outline" onClick={handleReset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset All Fields
            </Button>
          </div>

          {/* Right Side - Preview (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="sticky top-20">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-lg">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </span>
                    <Badge variant="outline">A4</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Biodata Preview */}
                  <div
                    ref={previewRef}
                    className="w-full aspect-[1/1.414] rounded-lg overflow-hidden shadow-lg relative"
                    style={{
                      backgroundColor: selectedTemplate.bgColor,
                      border: `4px solid ${selectedTemplate.borderColor}`,
                      fontFamily: "serif",
                    }}
                  >
                    <div className="p-4 h-full flex flex-col" style={{ fontSize: "10px" }}>
                      {/* Header */}
                      <div className="text-center mb-3">
                        <div className="text-2xl mb-1">{selectedGod.symbol}</div>
                        <div style={{ color: selectedTemplate.accentColor, fontSize: "11px" }}>
                          {selectedGod.mantra}
                        </div>
                      </div>

                      {/* Title */}
                      <div
                        className="text-center py-2 mb-3 rounded"
                        style={{ backgroundColor: selectedTemplate.headerBg }}
                      >
                        <h2 className="text-base font-bold text-white tracking-wide">BIODATA</h2>
                      </div>

                      <div className="flex gap-3 flex-1 overflow-hidden">
                        {/* Photo */}
                        {profilePhoto && (
                          <div className="w-20 flex-shrink-0">
                            <img
                              src={profilePhoto}
                              alt="Profile"
                              className="w-full aspect-[3/4] object-cover rounded"
                              style={{ border: `2px solid ${selectedTemplate.borderColor}` }}
                            />
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-1 space-y-2 overflow-hidden" style={{ color: selectedTemplate.textColor }}>
                          {/* Personal - VISIBLE SECTION (Name, DOB, Height, Education) */}
                          {(formData.name || formData.dob || formData.height || formData.education) && (
                            <div>
                              <h3
                                className="font-bold pb-0.5 mb-1 border-b text-xs"
                                style={{ borderColor: selectedTemplate.accentColor, color: selectedTemplate.headerBg }}
                              >
                                Personal Details
                              </h3>
                              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                                {formData.name && <div><span className="font-semibold">Name:</span> {formData.name}</div>}
                                {formData.dob && <div><span className="font-semibold">DOB:</span> {formData.dob}</div>}
                                {formData.height && <div><span className="font-semibold">Height:</span> {formData.height}</div>}
                                {formData.education && <div><span className="font-semibold">Education:</span> {formData.education}</div>}
                              </div>
                            </div>
                          )}

                          {/* BLURRED SECTION - Only blur when NOT in test mode */}
                          <div className="relative">
                            <div className={`${!testMode ? "blur-sm select-none pointer-events-none" : ""}`}>
                              {/* Other Personal Details */}
                              {(formData.timeOfBirth || formData.placeOfBirth || formData.religion || formData.caste || formData.gotra || formData.rashi || formData.nakshatra || formData.complexion || formData.bloodGroup || formData.occupation || formData.income) && (
                                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mb-2">
                                  {formData.timeOfBirth && <div><span className="font-semibold">Birth Time:</span> {formData.timeOfBirth}</div>}
                                  {formData.placeOfBirth && <div><span className="font-semibold">Birth Place:</span> {formData.placeOfBirth}</div>}
                                  {formData.religion && <div><span className="font-semibold">Religion:</span> {formData.religion}</div>}
                                  {formData.caste && <div><span className="font-semibold">Caste:</span> {formData.caste}</div>}
                                  {formData.gotra && <div><span className="font-semibold">Gotra:</span> {formData.gotra}</div>}
                                  {formData.rashi && <div><span className="font-semibold">Rashi:</span> {formData.rashi}</div>}
                                  {formData.nakshatra && <div><span className="font-semibold">Nakshatra:</span> {formData.nakshatra}</div>}
                                  {formData.complexion && <div><span className="font-semibold">Complexion:</span> {formData.complexion}</div>}
                                  {formData.bloodGroup && <div><span className="font-semibold">Blood:</span> {formData.bloodGroup}</div>}
                                  {formData.occupation && <div><span className="font-semibold">Occupation:</span> {formData.occupation}</div>}
                                  {formData.income && <div><span className="font-semibold">Income:</span> {formData.income}</div>}
                                </div>
                              )}

                              {/* Family */}
                              {(formData.fatherName || formData.motherName) && (
                                <div className="mb-2">
                                  <h3
                                    className="font-bold pb-0.5 mb-1 border-b text-xs"
                                    style={{ borderColor: selectedTemplate.accentColor, color: selectedTemplate.headerBg }}
                                  >
                                    Family Details
                                  </h3>
                                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                                    {formData.fatherName && <div><span className="font-semibold">Father:</span> {formData.fatherName}</div>}
                                    {formData.fatherOccupation && <div><span className="font-semibold">Occupation:</span> {formData.fatherOccupation}</div>}
                                    {formData.motherName && <div><span className="font-semibold">Mother:</span> {formData.motherName}</div>}
                                    {formData.brothers && <div><span className="font-semibold">Brothers:</span> {formData.brothers}</div>}
                                    {formData.sisters && <div><span className="font-semibold">Sisters:</span> {formData.sisters}</div>}
                                    {formData.familyType && <div><span className="font-semibold">Family:</span> {formData.familyType}</div>}
                                  </div>
                                </div>
                              )}

                              {/* Contact */}
                              {(formData.mobile || formData.address) && (
                                <div>
                                  <h3
                                    className="font-bold pb-0.5 mb-1 border-b text-xs"
                                    style={{ borderColor: selectedTemplate.accentColor, color: selectedTemplate.headerBg }}
                                  >
                                    Contact Details
                                  </h3>
                                  <div className="space-y-0.5">
                                    {formData.mobile && <div><span className="font-semibold">Mobile:</span> {formData.mobile}</div>}
                                    {formData.email && <div><span className="font-semibold">Email:</span> {formData.email}</div>}
                                    {formData.address && <div><span className="font-semibold">Address:</span> {formData.address}</div>}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Blur Overlay with Payment Badge - Only show when NOT in test mode */}
                            {!testMode && (formData.timeOfBirth || formData.placeOfBirth || formData.religion || formData.fatherName || formData.mobile) && (
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 flex items-end justify-center pb-2">
                                <Badge className="bg-rose-500 text-white shadow-lg animate-pulse text-xs">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Pay ₹49 to unlock full biodata
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Buttons */}
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => handleDownload("png")}
                  disabled={isGenerating || !formData.name}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileImage className="mr-2 h-4 w-4" />
                  )}
                  Download PNG
                </Button>
                <Button
                  onClick={() => handleDownload("pdf")}
                  disabled={isGenerating || !formData.name}
                  variant="outline"
                  className="flex-1"
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  Download PDF
                </Button>
              </div>

              {!formData.name && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Enter at least your name to enable download
                </p>
              )}

              {/* Pricing Info */}
              {testMode ? (
                <Card className="mt-4 border-green-300 bg-green-50">
                  <CardContent className="pt-4">
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
                <Card className="mt-4 border-rose-200 bg-rose-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Premium Download</p>
                        <p className="text-sm text-gray-600">High-quality PNG & PDF</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-rose-500">₹49</p>
                        <p className="text-xs text-gray-500">one-time</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
