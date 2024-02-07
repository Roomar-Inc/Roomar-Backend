/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - address
 *         - price
 *         - type
 *         - status
 *         - photos
 *         - author
 *         - finished
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the lodge
 *         address:
 *           type: string
 *           description: Place where property is located
 *         description:
 *           type: string
 *           description: Extra details about the property
 *         price:
 *           type: number
 *           description: Price of the property
 *         status:
 *           type: string
 *           enum: [Available, Unavailable]
 *           default: 'Available'
 *           description: Choose between Available and Unavailable
 *         photos:
 *           type: array
 *           description: Max of 7
 *
 *     User:
 *        type: object
 *        required:
 *          - name
 *          - username
 *          - email
 *          - role
 *          - password
 *          - phone
 *        properties:
 *          name:
 *             type: string
 *          username:
 *             type: string
 *          email:
 *             type: string
 *          role:
 *             type: string
 *          gender:
 *             type: string
 *          photo:
 *             type: string
 *          password:
 *             type: string
 *          phone:
 *             type: string
 *
 * tags:
 *   name: Property Postings
 *   description:
 * /api/v1/create:
 *   post:
 *     summary: Create and upload a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *
 * /api/v1/post/{post_id}:
 *   get:
 *      summary: Get a post by its id
 *      tags: [Posts]
 *   patch:
 *      summary: Update post
 *      description: Photos cannot be updated
 *      tags: [Posts]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *   delete:
 *      summary: Delete a post
 *      tags: [Posts]
 *
 * /api/v1/posts:
 *   get:
 *      summary: Get posts
 *      description: Get all posts of the authenticated user
 *      tags: [Posts]
 *
 * /api/v1/login:
 *   post:
 *      summary: Log in
 *      tags: [Auth]
 *
 * /api/v1/signup:
 *   post:
 *      summary: Sign up
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 * /api/v1/password:
 *   post:
 *      summary: Update Password
 *      tags: [Auth]
 *
 */
