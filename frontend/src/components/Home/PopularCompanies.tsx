import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft className="text-3xl" />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla className="text-3xl" />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple className="text-3xl" />,
    },
  ];
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse duration-10000"></div>
      
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold tracking-tight text-center mb-16">
          TOP <span className="text-gradient">COMPANIES</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {companies.map((element) => {
            return (
              <div 
                className="glass-card p-8 flex flex-col justify-between group hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 relative overflow-hidden" 
                key={element.id}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {element.icon}
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                    {element.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{element.title}</h4>
                  <p className="text-muted-foreground text-sm font-medium mb-6">{element.location}</p>
                </div>
                <button className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold rounded-xl transition-colors">
                  Open Positions ({element.openPositions})
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
