import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Camera, 
  Upload, 
  X, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Info,
  Download,
  Loader2,
  RefreshCw,
  MapPin,
  Phone
} from 'lucide-react';

interface SkinAnalysisResult {
  diseaseName: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  description: string;
  symptoms: string[];
  recommendations: string[];
  medicalAdvice: string;
  nextSteps: string[];
  doctors: {
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    phone: string;
  }[];
}

export function SkinDiseaseDetection() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const skinDoctors = [
    { name: 'Dr. Sanjay Panda', specialty: 'Dermatologist', hospital: 'AIIMS Bhubaneswar', location: 'Bhubaneswar, Odisha', phone: '+91-674-2397000' },
    { name: 'Dr. Malaya Mohapatra', specialty: 'Dermatologist', hospital: 'Apollo Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-7144444' },
    { name: 'Dr. Rojalin Sahoo', specialty: 'Cosmetic Dermatologist', hospital: 'Kalinga Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-6677777' },
    { name: 'Dr. Pradeep Mohanty', specialty: 'Dermatopathologist', hospital: 'SUM Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2386300' }
  ];

  const skinDiseases = [
    {
      name: 'Acne',
      confidence: 92,
      severity: 'Moderate' as const,
      description: 'Common skin condition that occurs when hair follicles become plugged with oil and dead skin cells.',
      symptoms: ['Blackheads', 'Whiteheads', 'Pimples', 'Cysts', 'Nodules'],
      recommendations: [
        'Use gentle, non-comedogenic skincare products',
        'Avoid touching or picking at affected areas',
        'Maintain a consistent skincare routine',
        'Consider topical treatments with salicylic acid'
      ],
      medicalAdvice: 'For moderate to severe acne, consult a dermatologist for prescription treatments.',
      nextSteps: [
        'Schedule appointment with dermatologist',
        'Start gentle skincare routine',
        'Monitor improvements over 4-6 weeks'
      ],
      doctors: skinDoctors.slice(0, 2)
    },
    {
      name: 'Eczema (Atopic Dermatitis)',
      confidence: 88,
      severity: 'Mild' as const,
      description: 'Chronic inflammatory skin condition causing dry, itchy, and inflamed skin.',
      symptoms: ['Dry skin', 'Itching', 'Red patches', 'Scaling', 'Cracking'],
      recommendations: [
        'Use fragrance-free moisturizers daily',
        'Avoid known triggers and allergens',
        'Take lukewarm showers instead of hot',
        'Use mild, soap-free cleansers'
      ],
      medicalAdvice: 'Apply prescribed topical corticosteroids as directed during flare-ups.',
      nextSteps: [
        'Identify and avoid triggers',
        'Maintain daily moisturizing routine',
        'Monitor for improvement or worsening'
      ],
      doctors: [skinDoctors[1], skinDoctors[3]]
    },
    {
      name: 'Psoriasis',
      confidence: 85,
      severity: 'Moderate' as const,
      description: 'Autoimmune condition causing rapid skin cell buildup, resulting in scaling and inflammation.',
      symptoms: ['Thick, silvery scales', 'Dry, cracked skin', 'Itching', 'Burning', 'Soreness'],
      recommendations: [
        'Apply moisturizers to prevent dryness',
        'Use prescribed topical treatments',
        'Get regular sunlight exposure (with protection)',
        'Manage stress levels'
      ],
      medicalAdvice: 'Regular dermatologist visits are important for monitoring and treatment adjustments.',
      nextSteps: [
        'Continue prescribed treatments',
        'Join psoriasis support groups',
        'Monitor for joint symptoms'
      ],
      doctors: [skinDoctors[0], skinDoctors[2]]
    },
    {
      name: 'Seborrheic Dermatitis',
      confidence: 90,
      severity: 'Mild' as const,
      description: 'Common skin condition causing scaly, itchy rash, typically on oily areas of the body.',
      symptoms: ['Flaky, white or yellow scales', 'Redness', 'Itching', 'Greasy skin patches'],
      recommendations: [
        'Use antifungal shampoos or cleansers',
        'Avoid harsh soaps and detergents',
        'Apply prescribed topical antifungals',
        'Manage stress and get adequate sleep'
      ],
      medicalAdvice: 'Condition is manageable with proper treatment and lifestyle adjustments.',
      nextSteps: [
        'Use medicated shampoos regularly',
        'Follow prescribed treatment plan',
        'Monitor affected areas for changes'
      ],
      doctors: [skinDoctors[1], skinDoctors[2]]
    },
    {
      name: 'Melanoma (Suspicious)',
      confidence: 76,
      severity: 'Severe' as const,
      description: 'Potentially serious form of skin cancer that develops in melanocytes.',
      symptoms: ['Asymmetrical moles', 'Irregular borders', 'Color variations', 'Diameter > 6mm', 'Evolving appearance'],
      recommendations: [
        'Seek immediate medical attention',
        'Avoid sun exposure',
        'Do not attempt self-treatment',
        'Document any changes in size or appearance'
      ],
      medicalAdvice: 'URGENT: Schedule immediate appointment with dermatologist or oncologist for biopsy.',
      nextSteps: [
        'Contact dermatologist immediately',
        'Prepare list of changes observed',
        'Arrange for possible biopsy'
      ],
      doctors: [skinDoctors[0], skinDoctors[3]]
    },
    {
      name: 'Contact Dermatitis',
      confidence: 87,
      severity: 'Mild' as const,
      description: 'Inflammatory skin reaction caused by contact with an allergen or irritant.',
      symptoms: ['Red, inflamed skin', 'Itching', 'Blisters', 'Dry, scaly skin', 'Burning sensation'],
      recommendations: [
        'Identify and avoid the trigger substance',
        'Use cool compresses to relieve itching',
        'Apply fragrance-free moisturizers',
        'Avoid scratching the affected area'
      ],
      medicalAdvice: 'Most cases resolve with proper care and avoiding triggers.',
      nextSteps: [
        'Remove or avoid known irritants',
        'Use prescribed topical treatments',
        'Monitor for improvement in 1-2 weeks'
      ],
      doctors: [skinDoctors[2], skinDoctors[3]]
    },
    {
      name: 'Rosacea',
      confidence: 83,
      severity: 'Moderate' as const,
      description: 'Chronic inflammatory condition causing facial redness and visible blood vessels.',
      symptoms: ['Facial redness', 'Visible blood vessels', 'Eye irritation', 'Thickened skin', 'Burning sensation'],
      recommendations: [
        'Use gentle skincare products',
        'Avoid known triggers (spicy food, alcohol, sun)',
        'Apply broad-spectrum sunscreen daily',
        'Use cool compresses during flare-ups'
      ],
      medicalAdvice: 'Long-term management requires identifying triggers and consistent skincare routine.',
      nextSteps: [
        'Keep a trigger diary',
        'Use prescribed topical treatments',
        'Schedule regular dermatologist visits'
      ],
      doctors: [skinDoctors[0], skinDoctors[1]]
    },
    {
      name: 'Fungal Infection',
      confidence: 91,
      severity: 'Mild' as const,
      description: 'Infection caused by fungi affecting the skin, nails, or hair.',
      symptoms: ['Itchy, scaly patches', 'Ring-shaped rash', 'Hair loss', 'Nail discoloration', 'Burning sensation'],
      recommendations: [
        'Keep affected area clean and dry',
        'Use antifungal medications as prescribed',
        'Avoid sharing personal items',
        'Wear breathable clothing and shoes'
      ],
      medicalAdvice: 'Most fungal infections respond well to topical or oral antifungal treatments.',
      nextSteps: [
        'Start antifungal treatment',
        'Maintain good hygiene',
        'Continue treatment for prescribed duration'
      ],
      doctors: [skinDoctors[1], skinDoctors[3]]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = async (): Promise<SkinAnalysisResult> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Return random skin disease for demo
    const randomDisease = skinDiseases[Math.floor(Math.random() * skinDiseases.length)];
    return randomDisease;
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    try {
      const result = await simulateAnalysis();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Severe': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Mild': return CheckCircle;
      case 'Moderate': return AlertTriangle;
      case 'Severe': return AlertTriangle;
      default: return Info;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">Skin Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload an image of your skin condition for AI-powered analysis and recommendations
        </p>
      </motion.div>

      <motion.div 
        className="grid lg:grid-cols-2 gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Image Upload Section */}
        <motion.div variants={itemVariants}>
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Image Upload
            </CardTitle>
            <CardDescription>
              Upload a clear, well-lit image of the affected skin area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!uploadedImage ? (
              <motion.div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ 
                  scale: 1.02,
                  borderColor: "var(--primary)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                </motion.div>
                <h3 className="font-semibold mb-2">Upload Skin Image</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your image here, or click to browse
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline">
                    Select Image
                  </Button>
                </motion.div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.img
                    src={uploadedImage}
                    alt="Uploaded skin image"
                    className="w-full h-64 object-cover rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
                
                <div className="flex gap-2">
                  <motion.div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Analyze Image
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Image Guidelines:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Use good lighting and clear focus</li>
                  <li>• Capture the affected area clearly</li>
                  <li>• Avoid shadows or reflections</li>
                  <li>• Include some surrounding healthy skin for context</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {analysisResult && (
            <>
              {/* Main Analysis Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                      {React.createElement(getSeverityIcon(analysisResult.severity), {
                        className: `w-8 h-8 ${analysisResult.severity === 'Severe' ? 'text-red-600' : analysisResult.severity === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{analysisResult.diseaseName}</h3>
                      <Badge className={getSeverityColor(analysisResult.severity)}>
                        {analysisResult.severity} Severity
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence Level</span>
                      <span className="font-semibold">{analysisResult.confidence}%</span>
                    </div>
                    <Progress value={analysisResult.confidence} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2">Common Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {analysisResult.severity === 'Severe' && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Urgent Medical Attention Required:</strong> This condition requires immediate professional evaluation.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Medical Advice Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Advice & Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Professional Medical Advice</h4>
                    <p className="text-sm text-blue-800">{analysisResult.medicalAdvice}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recommended Actions</h4>
                    <ul className="space-y-2">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Next Steps</h4>
                    <ol className="space-y-2">
                      {analysisResult.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Analysis Report
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Recommended Dermatologists (Odisha)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.doctors.map((doctor, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                        <Badge variant="outline">{doctor.specialty}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {doctor.hospital}, {doctor.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {doctor.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {!analysisResult && !isAnalyzing && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold mb-2">Ready for Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload an image to get started with AI-powered skin analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isAnalyzing && (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
                  <div>
                    <h3 className="font-semibold mb-2">Analyzing Image...</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI is examining your image for skin conditions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </motion.div>

      {/* Disclaimer */}
      <Alert className="mt-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
          Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
}