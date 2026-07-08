import api from "./axiosInstance";

export const applicationService = {
  postApplication: async (applicationData: FormData) => {
    const { data } = await api.post("/application/post", applicationData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  getEmployerApplications: async () => {
    const { data } = await api.get("/application/employer/getall");
    return data.applications;
  },
  getJobSeekerApplications: async () => {
    const { data } = await api.get("/application/jobseeker/getall");
    return data.applications;
  },
  deleteApplication: async (id: string) => {
    const { data } = await api.delete(`/application/delete/${id}`);
    return data;
  },
};
