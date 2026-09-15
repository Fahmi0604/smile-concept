declare type Education = {
  // year: number
  university: string;
  degree: string;
};

declare type Experience = {
  year: number;
  position: string;
  company: string;
};

declare type Schedule = {
  day: string;
  time: string;
};

declare type Social = {
  url: string;
};

declare type Doctor = {
  id: number;
  slug: string;
  prefix: string;
  name: string;
  postfix: string;
  specialty: string;
  bio: string;
  photoUrl: string;
  treatments: string[];
  educations: Education[];
  experiences: Experience[];
  schedules: Schedule[];
  certifications: string[];
  socials: Social[];
  created_at: string;
  updated_at: string;
};

// declare type DoctorsResponse = BaseResponse<Doctor>;
