import { z } from 'zod';
import { UserType, IndividualRole, OrganizationRole } from '../models/User';

export const individualRegistrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  userType: z.literal(UserType.INDIVIDUAL),
  role: z.nativeEnum(IndividualRole),
  fullname: z.string().min(1, { message: "Fullname is required" }),
  institution_organization: z.string().min(1, { message: "Institution/Organization is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  academic_background: z.string().min(1, { message: "Academic background is required" }),
  areas_of_interest: z.array(z.string()).min(1, { message: "At least one area of interest is required" }),
  research_area: z.string().min(1, { message: "Research area is required" }),
  current_goals: z.array(z.string()).min(1, { message: "At least one goal is required" }),
  current_experience_level: z.string().min(1, { message: "Experience level is required" }),
  coding_experience: z.string().min(1, { message: "Coding experience is required" }),
  
  // Optional/Additional fields
  bio: z.string().optional(),
  contact_visibility: z.array(z.string()).optional(),
});

export const organizationRegistrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  userType: z.literal(UserType.ORGANIZATION),
  role: z.nativeEnum(OrganizationRole),
  
  // Organization fields
  institution_type: z.string().min(1, { message: "Institution type is required" }),
  programs_offered: z.array(z.string()).min(1, { message: "At least one program must be offered" }),
  primary_focus: z.array(z.string()).min(1, { message: "At least one primary focus is required" }),
  primary_goals: z.array(z.string()).min(1, { message: "At least one primary goal is required" }),
  
  // Optional fields
  served_region: z.array(z.string()).optional(),
  engagement_method: z.array(z.string()).optional(),
  monetization_interest: z.boolean().optional(),
  pricing_help: z.boolean().optional(),
});
