import api from "./axiosInstance";

export const jobService = {
  getAllJobs: async () => {
    const { data } = await api.get("/job/getall");
    return data.jobs;
  },
  getMyJobs: async () => {
    const { data } = await api.get("/job/getmyjobs");
    return data.myJobs;
  },
  getSingleJob: async (id: string) => {
    const { data } = await api.get(`/job/${id}`);
    return data.job;
  },
  postJob: async (jobData: any) => {
    const { data } = await api.post("/job/post", jobData);
    return data;
  },
  updateJob: async (id: string, jobData: any) => {
    const { data } = await api.put(`/job/update/${id}`, jobData);
    return data;
  },
  deleteJob: async (id: string) => {
    const { data } = await api.delete(`/job/delete/${id}`);
    return data;
  },
};
