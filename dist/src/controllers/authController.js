"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.getMe = exports.registerUser = exports.registerOrganization = exports.registerIndividual = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const validation_1 = require("../utils/validation");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '30d',
    });
};
const registerIndividual = async (req, res) => {
    try {
        // Validate request body
        const validatedData = validation_1.individualRegistrationSchema.parse(req.body);
        const { email, password } = validatedData;
        // Check if user exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create user object
        const user = await User_1.default.create({
            ...validatedData,
            password: hashedPassword,
        });
        if (user) {
            const token = generateToken(user.id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            res.status(201).json({
                _id: user.id,
                userType: user.userType,
                role: user.role,
                email: user.email,
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ message: 'Validation Error', errors: error.issues || error.errors });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.registerIndividual = registerIndividual;
const registerOrganization = async (req, res) => {
    try {
        // Validate request body
        const validatedData = validation_1.organizationRegistrationSchema.parse(req.body);
        const { email, password } = validatedData;
        // Check if user exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create user object
        const user = await User_1.default.create({
            ...validatedData,
            password: hashedPassword,
        });
        if (user) {
            const token = generateToken(user.id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            res.status(201).json({
                _id: user.id,
                userType: user.userType,
                role: user.role,
                email: user.email,
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ message: 'Validation Error', errors: error.issues || error.errors });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.registerOrganization = registerOrganization;
// Deprecated: Kept for backward compatibility if needed, but routes should switch to above
const registerUser = async (req, res) => {
    res.status(400).json({ message: 'Please use specific registration endpoints: /api/auth/register/individual or /api/auth/register/organization' });
};
exports.registerUser = registerUser;
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
exports.getMe = getMe;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Please provide email and password' });
            return;
        }
        // Check for user email
        const user = await User_1.default.findOne({ email });
        if (user && (await bcryptjs_1.default.compare(password, user.password))) {
            const token = generateToken(user.id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            res.json({
                _id: user.id,
                userType: user.userType,
                role: user.role,
                email: user.email,
            });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
