"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRole = exports.IndividualRole = exports.UserType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var UserType;
(function (UserType) {
    UserType["INDIVIDUAL"] = "Individual";
    UserType["ORGANIZATION"] = "Organization";
})(UserType || (exports.UserType = UserType = {}));
var IndividualRole;
(function (IndividualRole) {
    IndividualRole["LEARNER"] = "Learner";
    IndividualRole["PROFESSIONAL"] = "Professional";
})(IndividualRole || (exports.IndividualRole = IndividualRole = {}));
var OrganizationRole;
(function (OrganizationRole) {
    OrganizationRole["CREATOR"] = "Creator Organization";
    OrganizationRole["HOST"] = "Host Organization";
})(OrganizationRole || (exports.OrganizationRole = OrganizationRole = {}));
const UserSchema = new mongoose_1.Schema({
    userType: {
        type: String,
        enum: Object.values(UserType),
        required: true,
    },
    role: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if (this.userType === UserType.INDIVIDUAL) {
                    return Object.values(IndividualRole).includes(value);
                }
                else if (this.userType === UserType.ORGANIZATION) {
                    return Object.values(OrganizationRole).includes(value);
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
        required: function () { return this.userType === UserType.INDIVIDUAL; },
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
exports.default = mongoose_1.default.model('User', UserSchema);
