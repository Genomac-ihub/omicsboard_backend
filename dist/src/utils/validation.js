"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRegistrationSchema = exports.individualRegistrationSchema = void 0;
const zod_1 = require("zod");
const User_1 = require("../models/User");
exports.individualRegistrationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    userType: zod_1.z.literal(User_1.UserType.INDIVIDUAL),
    role: zod_1.z.nativeEnum(User_1.IndividualRole),
    fullname: zod_1.z.string().min(1, { message: "Fullname is required" }),
    institution_organization: zod_1.z.string().min(1, { message: "Institution/Organization is required" }),
    specialization: zod_1.z.string().min(1, { message: "Specialization is required" }),
    academic_background: zod_1.z.string().min(1, { message: "Academic background is required" }),
    areas_of_interest: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one area of interest is required" }),
    research_area: zod_1.z.string().min(1, { message: "Research area is required" }),
    current_goals: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one goal is required" }),
    current_experience_level: zod_1.z.string().min(1, { message: "Experience level is required" }),
    coding_experience: zod_1.z.string().min(1, { message: "Coding experience is required" }),
    // Optional/Additional fields
    bio: zod_1.z.string().optional(),
    contact_visibility: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.organizationRegistrationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters long" }),
    userType: zod_1.z.literal(User_1.UserType.ORGANIZATION),
    role: zod_1.z.nativeEnum(User_1.OrganizationRole),
    // Organization fields
    institution_type: zod_1.z.string().min(1, { message: "Institution type is required" }),
    programs_offered: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one program must be offered" }),
    primary_focus: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one primary focus is required" }),
    primary_goals: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one primary goal is required" }),
    // Optional fields
    served_region: zod_1.z.array(zod_1.z.string()).optional(),
    engagement_method: zod_1.z.array(zod_1.z.string()).optional(),
    monetization_interest: zod_1.z.boolean().optional(),
    pricing_help: zod_1.z.boolean().optional(),
});
