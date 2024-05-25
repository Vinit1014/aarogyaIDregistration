<h1>AarogyaID Registration Web App</h1>

<p>AarogyaID Registration is a web application designed for secure user registration and login using OTP verification through email. The app also provides protected access to user-specific resources upon successful authentication.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Registration</strong>: Register with Aadhar number, email, and optionally other details like a driving license.</li>
    <li><strong>OTP Verification</strong>: OTP sent to user's email for verification using Nodemailer.</li>
    <li><strong>User Login</strong>: Login using email, receive OTP for authentication.</li>
    <li><strong>Protected Routes</strong>: Access to protected resources with valid JWT token.</li>
    <li><strong>Logout</strong>: Clear session and redirect to login page.</li>
    <li><strong>Toaster Notifications</strong>: Informative toast messages for various actions using 'sonner' library.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
    <li><strong>ReactJS</strong>: Frontend library for building user interfaces.</li>
    <li><strong>Node.js</strong>: JavaScript runtime for the backend.</li>
    <li><strong>Express</strong>: Web framework for Node.js.</li>
    <li><strong>MongoDB</strong>: NoSQL database for storing user data and OTPs.</li>
    <li><strong>Nodemailer</strong>: For sending OTP emails.</li>
    <li><strong>JWT (JSON Web Tokens)</strong>: For secure authentication and session management.</li>
</ul>

<h2>Setup and Installation</h2>
<p>To set up and run this project locally, follow these steps:</p>
<ol>
    <li><strong>Clone the Repository</strong>:
        <pre><code>git clone https://github.com/Vinit1014/aarogyaIDregistration.git
cd aarogyaIDregistration</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>:
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set Up Environment Variables</strong>:
        <p>Create a <code>.env</code> file in the root directory and add your MongoDB connection string and other necessary environment variables:</p>
        <pre><code>MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password</code></pre>
    </li>
    <li><strong>Run the Development Server</strong>:
        <pre><code>npm run dev</code></pre>
        <p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>
    </li>
</ol>

<h2>User Registration Process</h2>
<h3>Step 1: User Registration Form Submission</h3>
<p><strong>Frontend Interaction:</strong> User fills out the registration form with Aadhar number and email, then clicks submit.</p>
<p><strong>Backend Interaction (API Call):</strong> The frontend sends a POST request to <code>/api/send-otp</code> with Aadhar number and email. Backend generates an OTP, updates the database, and sends an OTP email using Nodemailer.</p>

<h3>Step 2: Verification of OTP</h3>
<p><strong>Frontend Interaction:</strong> User enters the received OTP and submits.</p>
<p><strong>Backend Interaction (API Call):</strong> The frontend sends a POST request to <code>/api/store-otp</code> with Aadhar number, OTP, and email. Backend verifies the OTP, generates a JWT token, updates the database, and responds with the token.</p>

<h2>User Login Process</h2>
<h3>Step 1: User Login Form Submission</h3>
<p><strong>Frontend Interaction:</strong> User fills out the login form with email and submits.</p>
<p><strong>Backend Interaction (API Call):</strong> The frontend sends a POST request to <code>/api/login/send-otp</code> with email. Backend generates an OTP, updates the database, and sends an OTP email using Nodemailer.</p>

<h3>Step 2: Verification of OTP</h3>
<p><strong>Frontend Interaction:</strong> User enters the received OTP and submits.</p>
<p><strong>Backend Interaction (API Call):</strong> The frontend sends a GET request to <code>/api/protected</code> with the JWT token. Backend verifies the token and grants access to protected resources if valid.</p>

<h2>Display Page Content (/app route)</h2>
<ul>
    <li><strong>Conditional Rendering:</strong> Renders content if JWT token is present, otherwise redirects to login.</li>
    <li><strong>Logout Functionality:</strong> Removes the token, redirects to login, and displays a success toast message.</li>
    <li><strong>Form Inputs:</strong> Registration form with fields for mobile number, email, and date of birth.</li>
    <li><strong>Form Submission:</strong> Displays an info toast message on submit.</li>
</ul>

<h2>Links</h2>
<ul>
    <li><a href="https://github.com/Vinit1014/aarogyaIDregistration">GitHub Repository</a></li>
    <li><a href="https://aarogya-i-dregistration-frontend.vercel.app/">Deployed App</a></li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! Please open an issue or submit a pull request.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>

<h2>Acknowledgements</h2>
<ul>
    <li>MongoDB for providing the database services.</li>
    <li>Nodemailer for handling email sending functionality.</li>
    <li>The ReactJS, Node.js, and Express communities for their invaluable resources and support.</li>
</ul>
