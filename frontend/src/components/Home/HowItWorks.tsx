import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold tracking-tight mb-4">How <span className="text-gradient">CareerConnect</span> Works</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">Your journey to a better career or finding the perfect candidate starts here. Just follow these simple steps.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 mx-auto bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FaUserPlus className="text-4xl" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Create Account</h4>
            <p className="text-muted-foreground">
              Sign up as a job seeker or an employer. It takes only a few minutes to set up your profile and get started.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 mx-auto bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <MdFindInPage className="text-4xl" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Find or Post a Job</h4>
            <p className="text-muted-foreground">
              Browse through thousands of job listings or post your requirements to find the perfect candidate for your company.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-20 h-20 mx-auto bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
              <IoMdSend className="text-4xl" />
            </div>
            <h4 className="text-2xl font-bold mb-4">Apply & Connect</h4>
            <p className="text-muted-foreground">
              Submit applications directly through our platform, or review applicant profiles and schedule interviews easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
