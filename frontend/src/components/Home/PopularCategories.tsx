import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-3xl" />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-3xl" />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-3xl" />,
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact className="text-3xl" />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-3xl" />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-3xl" />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-3xl" />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-3xl" />,
    },
  ];
  return (
    <div className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold tracking-tight text-center mb-16">
          POPULAR <span className="text-gradient">CATEGORIES</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((element) => {
            return (
              <div 
                className="glass-card p-6 flex flex-col gap-4 group cursor-pointer hover:-translate-y-2 hover:bg-white/10 transition-all duration-300" 
                key={element.id}
              >
                <div className="w-14 h-14 bg-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  {element.icon}
                </div>
                <div>
                  <p className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{element.title}</p>
                  <p className="text-sm font-medium text-muted-foreground">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
