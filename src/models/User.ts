import mongoose, { Document, Schema } from 'mongoose';

export enum UserType {
  INDIVIDUAL = 'Individual',
  ORGANIZATION = 'Organization',
}

export enum IndividualRole {
  LEARNER = 'Learner',
  PROFESSIONAL = 'Professional',
}

export enum OrganizationRole {
  CREATOR = 'Creator Organization',
  HOST = 'Host Organization',
}

export interface IUser extends Document {
  userType: UserType;
  role: IndividualRole | OrganizationRole;
  email: string;
  password?: string;
  
  // Individual Profile
  fullname?: string;
  institution_organization?: string;
  specialization?: string;
  bio?: string;
  contact_visibility?: string[]; 
  
  // Individual Interest and Goals
  academic_background?: string;
  areas_of_interest?: string[]; 
  research_area?: string;
  current_goals?: string[]; 
  current_experience_level?: string;
  coding_experience?: string;
  
  // Organization Interest and Goals
  institution_type?: string;
  programs_offered?: string[]; 
  primary_focus?: string[]; 
  primary_goals?: string[]; 
  served_region?: string[]; 
  engagement_method?: string[]; 
  monetization_interest?: boolean;
  pricing_help?: boolean;
}

const UserSchema: Schema = new Schema({
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true,
  },
  role: {
    type: String,
    required: true,
    validate: {
      validator: function(this: IUser, value: string) {
        if (this.userType === UserType.INDIVIDUAL) {
          return Object.values(IndividualRole).includes(value as IndividualRole);
        } else if (this.userType === UserType.ORGANIZATION) {
          return Object.values(OrganizationRole).includes(value as OrganizationRole);
        }
        return false;
      },
      message: 'Invalid role for the selected user type.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  // Individual Fields
  fullname: {
    type: String,
    required: function(this: IUser) { return this.userType === UserType.INDIVIDUAL; },
  },
  institution_organization: { type: String },
  specialization: { type: String },
  bio: { type: String },
  contact_visibility: { type: [String] },
  
  academic_background: { type: String },
  areas_of_interest: { type: [String] },
  research_area: { type: String },
  current_goals: { type: [String] },
  current_experience_level: { type: String },
  coding_experience: { type: String },
  
  // Organization Fields
  institution_type: { type: String },
  programs_offered: { type: [String] },
  primary_focus: { type: [String] },
  primary_goals: { type: [String] },
  served_region: { type: [String] },
  engagement_method: { type: [String] },
  monetization_interest: { type: Boolean },
  pricing_help: { type: Boolean },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
