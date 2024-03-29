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
 *         - town
 *         - price
 *         - type
 *         - contact
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
 *         town:
 *           type: string
 *           description: Exact community/village where property is located eg. Eziobodo Umuchima
 *         description:
 *           type: string
 *           description: Extra details about the property
 *         price:
 *           type: number
 *           description: Price of the property
 *         room_number:
 *           type: string
 *           description: Room Number
 *         photos:
 *           type: array
 *           description: Max of 7
 *         type:
 *           type: string
 *           enum: [furnished unfurnished]
 *           default: unfurnished
 *           description: Choose between furnished or unfurnished
 *         contact: 
 *           type: string
 *           description: leaser's/Seller's contact
 *         status:
 *           type: string
 *           enum: [available unavailable]
 *           default: 'available'
 *           description: Choose between Available and Unavailable

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
 *             enum: [owner seeker]
 *          gender:
 *             type: string
 *             enum: [male female]
 *          photo:
 *             type: string
 *          password:
 *             type: string
 *          phone:
 *             type: string
 *
 * tags:
 * /:
 *   get:
 *    summary: Retrieve all Posts from DB
 *    description: Paginated returns 15 posts per page add the page no. to the query params **i.e /?page=3**. Without specifying page or even page 1 it outputs the first 15 elements in the db
 *    tags: [Posts]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: A particular page amongst the already divided sections of the posts in the db
 *    responses:
 *       '200':
 *        description: Retrieved successfully
 *        content:
 *          application/json:
 *            example:
 *              total: 55
 *              pages: 4
 *              page: 1
 *              posts:
 *                 _id: 65bfa0026fa212499ec8628b
 *                 user_id: 65be5b7d5bcc186da231999f
 *                 name: Akusom Lodge
 *                 address: Behind Three Threes Opposite Adanna
 *                 location: Eziobodo
 *                 description: Clean but with troublesome caretaker
 *                 price: 150000
 *                 type: Unfurnished
 *                 status: Available
 *                 photos: []
 *
 * /post:
 *   post:
 *     summary: Create and upload a post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post' 
 *     responses:
 *       '200':
 *        description: Created successfully
 *        content:
 *          application/json:
 *            example:
 *              post:
 *               user_id: 65ce1a4706af50797f434380
 *               name: Kwechiri Lodge
 *               address: Behind Three Trees opposite Adanna
 *               town: Eziobodo
 *               contact: 09123748923
 *               description: Clean but with troublesome caretaker
 *               price: 150000
 *               type: furnished
 *               status: available
 *               photos:
 *                 http://res.cloudinary.com/dufy5hiis/image/upload/v1708440983/vo67ojk0auihzfawors5.webp
 *                 http://res.cloudinary.com/dufy5hiis/image/upload/v1708440982/jv4eltxvcv1lhimhcuuo.webp
 *               _id: 65d4bd90e8eb8f58a50c08c7
 *
 * /search:
 *   get:
 *    summary: Search by name
 *    description: search based on given expression paginated to 15 per page takes in the search expression with parameter s **i.e ?s=Akusom Lodge**. To further paginate the result based on your entry apply **page** parameter **i.e ?page=2** but by default it returns the first page which must not be explicitly stated
 *    tags: [Posts]
 *    responses:
 *       '200':
 *        description: Search successfully
 *        content:
 *          application/json:
 *            example:
 *              total: 3
 *              pages: 1
 *              page: 1
 *              posts:
 *                 _id: 65bfa0026fa212499ec8628b
 *                 user_id: 65be5b7d5bcc186da231999f
 *                 name: Akusom Lodge
 *                 address: Behind Three Threes Opposite Adanna
 *                 location: Eziobodo
 *                 description: Clean but with troublesome caretaker
 *                 price: 150000
 *                 type: Unfurnished
 *                 status: Available
 *                 photos: []
 *
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
 *      description: Get all posts of the authenticated user paginated and sorted 
 *      tags: [Posts]
 * 
 * /profile:
 *   get: 
 *      summary: Get Profile
 *      description: Get profile information 
 *      tags: [Profile]
 *      responses:
 *       '200':
 *        description: Search successfully
 *        content:
 *          application/json:
 *            example:
 *              _id: 65d62a85985343ed47caae69
 *              name: CHikobi
 *              username: Jimalusun
 *              email: whistler@gmail.com
 *              role: seeker
 *              phone: 091332891232
 *              wishlist: []
 *              passwordChangedAt: 2024-02-21T16:53:25.178Z
 *              createdAt: 2024-02-21T16:53:30.749Z
 *              updatedAt: 2024-02-22T12:58:34.648Z
 * 
 *   patch: 
 *      summary: Update Profile
 *      description: Email Password and Role cannot be updated via this route 
 *      tags: [Profile]
 *      responses:
 *       '200':
 *        description: Update successful
 *        content:
 *          application/json:
 *            example:
 *              _id: 65d62a85985343ed47caae69
 *              name: David
 *              username: Jimalusun
 *              email: whistler@gmail.com
 *              role: seeker
 *              phone: 091332891232
 *              wishlist: []
 *              passwordChangedAt: 2024-02-21T16:53:25.178Z
 *              createdAt: 2024-02-21T16:53:30.749Z
 *              updatedAt: 2024-02-22T12:58:34.648Z
 * 
 * /wishlist:
 *   get:
 *      summary: View wishlist
 *      description: Get items in wishlist
 *      tags: [Profile]
 *      responses:
 *       '200':
 *        description: Successful
 *        content:
 *          application/json:
 *            example:
 *               total: 3
 *               pages: 1
 *               page: 1
 *               posts: 
 *                 _id: 65bfa2e2f91b5bd8131f05a2
 *                 user_id: 65be5b7d5bcc186da231999f
 *                 name: Akusom Lodge
 *                 address: Behind Three Trees opposite Adanna
 *                 description: Clean but with troublesome caretaker
 *                 price: 150000
 *                 type: Unfurnished
 *                 status: Available
 *                 photos:
 *                    http://res.cloudinary.com/dufy5hiis/image/upload/v1707057893/nurhquqmhjsajlbhxfwp.webp
 *                    http://res.cloudinary.com/dufy5hiis/image/upload/v1707057893/eqvkswuqwjwroj1xcaea.webp
                  
 *  
 * /wishlist/{post_id}:
 *   patch:
 *      summary: Add post to wishlist
 *      description: Send post id as request param
 *      tags: [Profile]
 *      responses:
 *       '201':
 *        description: Added Successfully
 *        content:
 *          application/json:
 *            example:
 *              message: Add to wishlist successful
 *
 *   delete:
 *      summary: Delete from wishlist
 *      description: Send post id as request param
 *      tags: [Profile]
 *      responses:
 *        '204':
 *          description: Deleted successfully
 *          application/json:
 *            example:
 *
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
 *               phone: 091332891232
 *               wishlist: []
 *               passwordChangedAt: 2024-02-15T00:19:21.060Z
 *               _id: 65cd58891af01039edf55634
 *               createdAt: 2024-02-15T00:19:21.104Z
 *               updatedAt: 2024-02
 *
 *       '400':
 *        description: Unsuccesful attempt check the returned response object for the error in particular. Most probably ommiting required field or wrong key value format.
 *        content:
 *          application/json:
 *           examples:
 *            Missing Username:
 *             summary: Missing Username
 *             value:
 *               name: ValidatorError
 *               message: Please input your username
 *            Existing Email:
 *              summary:
 *              value:
 *                name: ValidatorError
 *                message: Error expected username to be unique. Value johnhouses
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
 *
 *      responses:
 *       '200':
 *        description: Successful Login
 *        content:
 *          application/json:
 *            example:
 *              token: NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2MwMTdlNmU4ZWJkNGRjOTBjNmU2NSIsImlhdCI6MTcwNzg2ODU0NSwiZXhwIjoxNzA5MTY0NTQ1fQ.jZ0t38f7Tkbzy2ZNeBKFCsWA
 *              user:
 *               name: Adroit Lane
 *               username: AdLan
 *               email: adrrylane@gmail.com
 *               role: seeker
 *               phone: 091332891232
 *               wishlist: []
 *               passwordChangedAt: 2024-02-15T00:19:21.060Z
 *               _id: 65cd58891af01039edf55634
 *               createdAt: 2024-02-15T00:19:21.104Z
 *               updatedAt: 2024-02
 *       '401':
 *        description: Unsuccessful request
 *        content:
 *          application/json:
 *           examples:
 *            Incorrect Details:
 *             value:
 *               status: fail
 *               message: Incorrect email or password
 *            Missing Details:
 *              value:
 *                status: fail
 *                message: Please provide email and password
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
 *      responses:
 *       '200':
 *        description: OTP Successfully sent
 *        content:
 *          application/json:
 *            example:
 *               message: Token sent to email
 *
 * /verifyOTP:
 *   post:
 *      summary: Confirms OTP
 *      description: >
 *        Step 2/3
 *        Verifies OTP if successful sends out a JWT Reset Token as part of the response
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
 *      responses:
 *       '200':
 *        description: OTP Verified Succesfully
 *        content:
 *          application/json:
 *            example:
 *               message: OTP verified successfully
 *               resetToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2UxYTQ3MDZhZjUwNzk3ZjQzNDM4MCIsImlhdCI6MTcwODAwNTk2MSwiZXhwIjoxNzA5MzAxOTYxfQ.98XQMbbX1TYGOxN2U8Rg6tbPSrzvLAl3ZiAZdmQdW_k
 *
 * /resetPassword:
 *   patch:
 *      summary: Update Password
 *      description: >
 *        Step 3/3
 *        Takes in Reset Token from the **verifyOTP** route alongside the new password choice which should log the user in if successful. Anyway you can store the reset token from the last response and send alongside thiis request
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
 *               phone: 091332891232
 *               wishlist: []
 *               passwordChangedAt: 2024-02-15T00:19:21.060Z
 *               _id: 65cd58891af01039edf55634
 *               createdAt: 2024-02-15T00:19:21.104Z
 *               updatedAt: 2024-02
 *
 * /password:
 *   patch:
 *      summary: Change Existing Password
 *      description: Must be logged in i.e Bearer Token Header should be set
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *            Incorrect Details:
 *             value:
 *               status: fail
 *               message: Incorrect email or password
 *            Missing Details:
 *              value:
 *                status: fail
 *                message: Please provide email and password
 *
 *      responses:
 *       '201':
 *        description: Changed successfully
 *        content:
 *          application/json:
 *            example:
 *               message: Password successfully changed
 *
 *       '401':
 *        description: Unsuccessful requests
 *        content:
 *          application/json:
 *            examples:
 *             Wrong Password:
 *              value:
 *                status: fail
 *                message: Your current password is wrong
 *
 */
