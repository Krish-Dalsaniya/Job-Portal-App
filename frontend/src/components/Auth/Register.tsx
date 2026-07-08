import React, { useContext } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../../Context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../api/authService";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Job Seeker", "Employer"], { required_error: "Please select a role" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsAuthorized(true);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    mutation.mutate(data);
  };

  if(isAuthorized) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse duration-10000"></div>
      
      <div className="w-full max-w-5xl glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-3xl font-bold tracking-tight mb-2">Create Account</h3>
            <p className="text-muted-foreground">Join <span className="text-gradient font-bold">CareerConnect</span> today</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium leading-none">Register As</label>
                <div className="relative">
                  <select 
                    {...register("role")}
                    className="flex h-11 w-full items-center justify-between rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                  >
                    <option value="" className="text-black">Select Role</option>
                    <option value="Employer" className="text-black">Employer</option>
                    <option value="Job Seeker" className="text-black">Job Seeker</option>
                  </select>
                  <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
              </div>

              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium leading-none">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className="flex h-11 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <FaPencilAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Phone Number</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter your phone"
                  {...register("phone")}
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <FaPhoneFlip className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="flex h-11 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <RiLock2Fill className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full h-12 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Registering..." : "Register"}
            </button>
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account? <Link to={"/login"} className="text-primary hover:underline font-medium">Login Now</Link>
            </div>
          </form>
        </div>
        
        <div className="hidden md:block md:w-1/2 bg-muted/20 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
          <img src="/register.png" alt="register" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

export default Register;
