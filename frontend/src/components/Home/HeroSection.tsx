import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "123,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase className="text-3xl" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-3xl" />,
    },
    {
      id: 3,
      title: "234,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-3xl" />,
    },
    {
      id: 4,
      title: "103,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-3xl" />,
    },
  ];
  return (
    <div className="pt-32 pb-16 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse duration-10000"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
            Find a job that suits <br className="hidden lg:block" />
            <span className="text-gradient">your interests and skills</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Discover job opportunities that match your skills and passions. Connect with employers seeking talent like yours for rewarding careers.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start mt-4">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              Explore Jobs
            </button>
            <button className="glass hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all">
              Post a Job
            </button>
          </div>
        </div>
        
        <div className="relative z-10 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl blur-2xl -z-10"></div>
          <img src="/heroS.jpg" alt="hero" className="rounded-3xl shadow-2xl border border-white/10 object-cover h-[500px] w-full hover:scale-[1.02] transition-transform duration-500" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((element) => {
            return (
              <div className="glass-card p-6 flex items-center gap-6 group hover:bg-white/10 transition-colors" key={element.id}>
                <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {element.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">{element.title}</p>
                  <p className="text-muted-foreground font-medium">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
