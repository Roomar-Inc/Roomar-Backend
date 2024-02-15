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
 *             enum: [owner, seeker]
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
 * /create:
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
 * /post/{post_id}:
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
 * /posts:
 *   get:
 *      summary: Get posts
 *      description: Get all posts of the authenticated user
 *      tags: [Posts]
 *
 * /login:
 *   post:
 *      summary: Log in
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               password:
 *                  type: string
 * /signup:
 *   post:
 *      summary: Sign up
 *      description: Check for required roles in the User schema
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *
 *      responses:
 *       '201':
 *        description: Created successfully
 *        content:
 *          application/json:
 *            example:
 *              token: NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2MwMTdlNmU4ZWJkNGRjOTBjNmU2NSIsImlhdCI6MTcwNzg2ODU0NSwiZXhwIjoxNzA5MTY0NTQ1fQ.jZ0t38f7Tkbzy2ZNeBKFCsWA
 *              user:
 *               name: Adroit Lane
 *               username: AdLan
 *               email: adrrylane@gmail.com
 *               role: seeker
 *               phone: "091332891232"
 *               wishlist: []
 *               passwordChangedAt: 2024-02-15T00:19:21.060Z
 *               _id: 65cd58891af01039edf55634
 *               createdAt: 2024-02-15T00:19:21.104Z
 *               updatedAt: 2024-02
 *
 *       '400':
 *        description: Unsuccesful attempt, check the returned response object for the error in particular. Most probably ommiting required field or wrong key, value format. Returning the mail means an account already exists with that email
 *        content:
 *          application/json:
 *           example:
 *            name: ValidatorError
 *            message: Please input your username
 *
 *
 * /password:
 *   patch:
 *      summary: Change Existing Password
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_password:
 *                  type: string
 *               new_password:
 *                  type: string
 *
 * /forgotPassword:
 *   post:
 *      summary: Sends OTP
 *      description:
 *        Step 1/3
 *        Sends OTP to the email
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *
 * /verifyOTP:
 *   post:
 *      summary: Confirms OTP
 *      description: >
 *        Step 2/3
 *        Verifies OTP, if successful sends out a JWT Reset Token as part of the response
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                  type: string
 *
 * /resetPassword:
 *   patch:
 *      summary: Update Password
 *      description: >
 *        Step 3/3
 *        Takes in Reset Token from the **verifyOTP** route alongside the new password choice which should log the user in, if successful. Anyway you can store the reset token from the last response and send alongside thiis request
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                  type: string
 *               new_password:
 *                  type: string
 */
