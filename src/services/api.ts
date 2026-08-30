import {jobs,dsaProblems,skills,roadmap} from '../data/data';
export const api={
  async getDashboard(){return {readiness:72,dsa:64,technical:78,interview:58}},
  async getSkills(){return skills},
  async getRoadmap(){return roadmap},
  async getDSA(){return dsaProblems},
  async getJobs(){return jobs},
  async getCompanyPrep(company:string){return {company,readiness:78}},
};
