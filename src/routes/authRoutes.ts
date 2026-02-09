import express from 'express';
import { registerUser, registerIndividual, registerOrganization, loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userType:
 *           type: string
 *           enum: [Individual, Organization]
 *         role:
 *           type: string
 *         email:
 *           type: string
 *         fullname:
 *           type: string
 *         institution_organization:
 *           type: string
 *         specialization:
 *           type: string
 *         bio:
 *           type: string
 *         contact_visibility:
 *           type: array
 *           items:
 *             type: string
 *         academic_background:
 *           type: string
 *         areas_of_interest:
 *           type: array
 *           items:
 *             type: string
 *         research_area:
 *           type: string
 *         current_goals:
 *           type: array
 *           items:
 *             type: string
 *         current_experience_level:
 *           type: string
 *         coding_experience:
 *           type: string
 *         institution_type:
 *           type: string
 *         programs_offered:
 *           type: array
 *           items:
 *             type: string
 *         primary_focus:
 *           type: array
 *           items:
 *             type: string
 *         primary_goals:
 *           type: array
 *           items:
 *             type: string
 *         served_region:
 *           type: array
 *           items:
 *             type: string
 *         engagement_method:
 *           type: array
 *           items:
 *             type: string
 *         monetization_interest:
 *           type: boolean
 *         pricing_help:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register/individual:
 *   post:
 *     summary: Register a new Individual user (Learner/Professional)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - userType
 *               - role
 *               - fullname
 *               - institution_organization
 *               - specialization
 *               - academic_background
 *               - areas_of_interest
 *               - research_area
 *               - current_goals
 *               - current_experience_level
 *               - coding_experience
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [Individual]
 *                 default: Individual
 *               role:
 *                 type: string
 *                 enum: [Learner, Professional]
 *               fullname:
 *                 type: string
 *               institution_organization:
 *                 type: string
 *               specialization:
 *                 type: string
 *               bio:
 *                 type: string
 *               contact_visibility:
 *                 type: array
 *                 items:
 *                   type: string
 *               academic_background:
 *                 type: string
 *               areas_of_interest:
 *                 type: array
 *                 items:
 *                   type: string
 *               research_area:
 *                 type: string
 *               current_goals:
 *                 type: array
 *                 items:
 *                   type: string
 *               current_experience_level:
 *                 type: string
 *               coding_experience:
 *                 type: string
 *     responses:
 *       201:
 *         description: Individual user registered successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/register/individual', registerIndividual);

/**
 * @swagger
 * /api/auth/register/organization:
 *   post:
 *     summary: Register a new Organization (Creator/Host)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - userType
 *               - role
 *               - institution_type
 *               - programs_offered
 *               - primary_focus
 *               - primary_goals
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [Organization]
 *                 default: Organization
 *               role:
 *                 type: string
 *                 enum: [Creator Organization, Host Organization]
 *               institution_type:
 *                 type: string
 *               programs_offered:
 *                 type: array
 *                 items:
 *                   type: string
 *               primary_focus:
 *                 type: array
 *                 items:
 *                   type: string
 *               primary_goals:
 *                 type: array
 *                 items:
 *                   type: string
 *               served_region:
 *                 type: array
 *                 items:
 *                   type: string
 *               engagement_method:
 *                 type: array
 *                 items:
 *                   type: string
 *               monetization_interest:
 *                 type: boolean
 *               pricing_help:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Organization registered successfully
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/register/organization', registerOrganization);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: (Deprecated) Register a new user
 *     tags: [Auth]
 *     description: Please use /api/auth/register/individual or /api/auth/register/organization instead.
 *     responses:
 *       400:
 *         description: Endpoint deprecated
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: token=abcde12345; Path=/; HttpOnly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 role:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, getMe);

export default router;
