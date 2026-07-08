import React, { useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { Context } from "../../Context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../api/authService";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["Job Seeker", "Employer"], { required_error: "Please select a role" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { setIsAuthorized } = useContext(Context);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsAuthorized(true);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse duration-10000"></div>
      
      <div className="w-full max-w-5xl glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h3>
            <p className="text-muted-foreground">Login to your <span className="text-gradient font-bold">CareerConnect</span> account</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Login As</label>
              <div className="relative">
                <select 
                  {...register("role")}
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  <option value="" className="text-black">Select Role</option>
                  <option value="Job Seeker" className="text-black">Job Seeker</option>
                  <option value="Employer" className="text-black">Employer</option>
                </select>
                <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password")}
                  className="flex h-12 w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
                <RiLock2Fill className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg" />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </button>
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? <Link to={"/register"} className="text-primary hover:underline font-medium">Register Now</Link>
            </div>
          </form>
        </div>
        
        <div className="hidden md:block md:w-1/2 bg-muted/20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 mix-blend-overlay"></div>
          <img src="/login.png" alt="login" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

export default Login;
