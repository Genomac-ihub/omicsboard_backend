import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';
import User, { IUser, UserType } from '../models/User';
import { individualRegistrationSchema, organizationRegistrationSchema } from '../utils/validation';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '30d',
  });
};

export const registerIndividual = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validatedData = individualRegistrationSchema.parse(req.body);

    const { email, password } = validatedData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user = await User.create({
      ...validatedData,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user.id as string);
      
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
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Validation Error', errors: (error as any).issues || (error as any).errors });
    } else {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export const registerOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validatedData = organizationRegistrationSchema.parse(req.body);

    const { email, password } = validatedData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const user = await User.create({
      ...validatedData,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(user.id as string);
      
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
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: 'Validation Error', errors: (error as any).issues || (error as any).errors });
    } else {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

// Deprecated: Kept for backward compatibility if needed, but routes should switch to above
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  res.status(400).json({ message: 'Please use specific registration endpoints: /api/auth/register/individual or /api/auth/register/organization' });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json(req.user);
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password as string))) {
      const token = generateToken(user.id as string);
      
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
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
