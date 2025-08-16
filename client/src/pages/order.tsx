import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, Send, X, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertOrderSchema } from "@shared/schema";
import type { InsertOrder } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Order() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      college: "",
      projectName: "",
      projectDetails: "",
      whatsappNumber: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const response = await apiRequest("POST", "/api/orders", data);
      return response.json();
    },
    onSuccess: (data) => {
      setShowThankYou(true);
      form.reset();
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you soon via WhatsApp. Order ID: " + data.orderId,
      });
    },
    onError: (error) => {
      toast({
        title: "Order Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertOrder) => {
    orderMutation.mutate(data);
  };

  if (showThankYou) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-poppins font-bold gradient-text mb-4">
            Thank You!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Your order has been submitted successfully. We'll contact you soon!
          </p>
          <Button
            onClick={() => setShowThankYou(false)}
            className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan px-8 py-4 rounded-2xl font-poppins font-semibold text-lg transition-all duration-300 button-press subtle-glow"
          >
            Submit Another Order
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-20 relative bg-gradient-to-br from-carbon-black to-space-dark overflow-hidden">
        {/* Enhanced 3D background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%)',
            }}
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-20 right-10 w-48 h-48 opacity-8"
            style={{
              background: 'conic-gradient(from 0deg, rgba(139,92,246,0.1), rgba(255,0,128,0.1), rgba(0,255,255,0.1))',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
              rotate: [0, 360],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-poppins font-bold gradient-text mb-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Order Your Project
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Get started with your custom project today. Fill out the form below and we'll get back to you within 24 hours.
            </motion.p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                z: 10
              }}
              className="glass-effect p-8 rounded-3xl transform-gpu shadow-2xl border border-neon-cyan/30 hover:border-neon-cyan/60 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>



                <div>
                  <Label htmlFor="college" className="block text-sm font-medium mb-2">
                    College Name *
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    placeholder="Enter your college name"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300"
                    {...form.register("college")}
                  />
                  {form.formState.errors.college && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.college.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectName" className="block text-sm font-medium mb-2">
                    Project Name *
                  </Label>
                  <Input
                    id="projectName"
                    type="text"
                    placeholder="Enter project name or select from our catalog"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300"
                    {...form.register("projectName")}
                  />
                  {form.formState.errors.projectName && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.projectName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectDetails" className="block text-sm font-medium mb-2">
                    Project Details *
                  </Label>
                  <Textarea
                    id="projectDetails"
                    rows={4}
                    placeholder="Describe your project requirements, deadline, and any specific features needed"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300 resize-none"
                    {...form.register("projectDetails")}
                  />
                  {form.formState.errors.projectDetails && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.projectDetails.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="whatsappNumber" className="block text-sm font-medium mb-2">
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none transition-colors duration-300"
                    {...form.register("whatsappNumber")}
                  />
                  {form.formState.errors.whatsappNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {form.formState.errors.whatsappNumber.message}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center"
                >
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="inline-flex items-center space-x-2 text-neon-cyan hover:text-electric-blue transition-colors duration-300 underline underline-offset-4"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Terms & Conditions</span>
                  </button>
                  {!termsAccepted && (
                    <p className="text-sm text-gray-400 mt-2">
                      Please read and accept the Terms & Conditions before submitting your order.
                    </p>
                  )}
                </motion.div>

                <Button
                  type="submit"
                  disabled={orderMutation.isPending || !termsAccepted}
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan py-4 rounded-2xl font-poppins font-bold text-lg transition-all duration-300 button-press subtle-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {orderMutation.isPending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Order
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTermsModal(false)}
          >
            {/* Backdrop with blur effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-effect rounded-3xl relative shadow-2xl border border-white/10 bg-gradient-to-br from-space-dark/95 via-slate-900/95 to-space-dark/95 backdrop-blur-xl">

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-6"
                  >
                    <h2 className="text-3xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-purple bg-clip-text text-transparent mb-2">
                      Terms & Conditions
                    </h2>
                    <p className="text-lg text-neon-cyan font-medium">Project Xpress</p>
                  </motion.div>

                  {/* Scrollable Content */}
                  <div className="max-h-[50vh] md:max-h-[40vh] overflow-y-auto custom-scrollbar">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-6 text-gray-300"
                    >
                      {/* Installation & Explanation Charges */}
                      <div>
                        <h3 className="text-xl font-bold text-neon-cyan mb-3">Installation & Explanation Charges</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>For SRM students:</strong> ₹500 will be charged for offline installation and explanation.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0"></div>
                            <span>Online installation & explanation will be conducted via Autodesk at the same charge for others.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Project Timeline & Urgent Requests */}
                      <div>
                        <h3 className="text-xl font-bold text-neon-purple mb-3">Project Timeline & Urgent Requests</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                            <span>Clients must inform us at least one week in advance for project development.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                            <span>Any last-moment requests will incur additional charges based on urgency.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Advance Payment Policy */}
                      <div>
                        <h3 className="text-xl font-bold text-electric-blue mb-3">Advance Payment Policy</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Hardware projects:</strong> 50% advance payment is required.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                            <span><strong>Software projects:</strong> 25% advance payment is required.</span>
                          </li>
                        </ul>
                      </div>

                      {/* Maintenance, Changes & Updates */}
                      <div>
                        <h3 className="text-xl font-bold text-neon-green mb-3">Maintenance, Changes & Updates</h3>
                        <p className="text-sm md:text-base">
                          Any modifications, updates, or maintenance after project delivery will be charged separately based on the work required.
                        </p>
                      </div>

                      {/* Project Report Charges */}
                      <div>
                        <h3 className="text-xl font-bold text-neon-pink mb-3">Project Report Charges</h3>
                        <p className="text-sm md:text-base">
                          An additional fee of ₹500 will be charged for preparing a project report and PPT.
                        </p>
                      </div>

                      {/* Refund Policy */}
                      <div className="border-t border-gray-600 pt-4">
                        <h3 className="text-xl font-bold text-red-400 mb-3">Refund Policy</h3>
                        <p className="text-sm md:text-base font-medium">
                          Once a project is confirmed and payment is made, <span className="text-red-400">no refunds will be issued under any circumstances.</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Agreement Section */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 pt-6 border-t border-gray-600"
                  >
                    <div className="flex items-start space-x-3 mb-6">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={agreeChecked}
                        onChange={(e) => setAgreeChecked(e.target.checked)}
                        className="w-5 h-5 text-neon-cyan bg-transparent border-2 border-gray-500 rounded focus:ring-neon-cyan focus:ring-2 mt-1"
                      />
                      <label htmlFor="agreeTerms" className="text-sm md:text-base text-gray-300 cursor-pointer">
                        I have read and agree to the Terms & Conditions.
                      </label>
                    </div>

                    <motion.button
                      onClick={() => {
                        if (agreeChecked) {
                          setTermsAccepted(true);
                          setShowTermsModal(false);
                          toast({
                            title: "Terms Accepted",
                            description: "You can now submit your order.",
                          });
                        }
                      }}
                      disabled={!agreeChecked}
                      whileHover={agreeChecked ? { scale: 1.02 } : {}}
                      whileTap={agreeChecked ? { scale: 0.98 } : {}}
                      className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan py-3 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Agree & Continue
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
