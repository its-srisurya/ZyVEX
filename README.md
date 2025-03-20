# ZyVEX - A Platform for Creators

ZyVEX is a crowd funding platform designed for content creators to easily receive support from their audience and fans. The platform provides a simple, transparent way for supporters to contribute to creators they appreciate.

## Project Overview

ZyVEX allows creators to:
- Set up a personalized profile that showcases their work
- Receive direct financial support from their audience through Razorpay integration
- Track payment history and supporter messages
- Customize their profile with cover photos and personal information

Supporters can:
- Make one-time contributions to their favorite creators
- Leave personalized messages along with their support
- Choose from preset amounts or enter custom support amounts

## Technologies Used

- **Frontend**: Next.js 14, React.js, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: Clerk Authentication
- **Payment Processing**: Razorpay
- **Data Storage**: MongoDB Atlas
- **Deployment**: Vercel

## Features

### User Authentication
- Secure user authentication through Clerk
- User profile management
- Role-based access control
- Custom sign-in and sign-up pages
- Protected route handling with middleware

### Creator Dashboard
- Overview of total funds raised and payment count
- List of recent supporters with their messages
- Profile customization options
- Cover photo upload functionality
- Real-time payment notifications

### Payment Integration
- Secure payment processing through Razorpay
- Custom payment amounts
- Preset payment options
- Message inclusion with payments
- Payment verification and webhook handling
- Secure credential storage

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Consistent styling across devices
- Interactive UI elements
- Custom loading animations

## Technical Architecture

### Frontend Architecture
The frontend is built using Next.js 14 with the App Router for improved performance and enhanced user experience. Key architectural components include:

1. **Client and Server Components**: Appropriate use of client and server components to optimize rendering
2. **Component Structure**: Modular components for reusability and maintainability
3. **State Management**: React hooks for local state and context for global state
4. **Styling**: Tailwind CSS for responsive design and custom animations
5. **Form Handling**: Controlled components with validation for data input

### Backend Architecture
The backend is implemented using Next.js API routes and MongoDB for data persistence:

1. **API Routes**: RESTful endpoints for handling data operations
2. **Server Actions**: Next.js server actions for server-side operations
3. **Data Models**: Mongoose schemas for data modeling
4. **Authentication**: Clerk for user authentication and authorization
5. **Payment Processing**: Integration with Razorpay for secure transactions

### Database Schema
The MongoDB database contains the following collections:

1. **UserProfile**: Stores user profile information including:
   - userId (from Clerk)
   - coverPhoto
   - createdAt
   - updatedAt

2. **Payment**: Records all payment transactions with fields:
   - name (of supporter)
   - amount
   - message
   - orderId (from Razorpay)
   - paymentId (from Razorpay)
   - status (created, completed, failed)
   - recipient (userId of creator)
   - createdAt

3. **RazorpayCredentials**: Securely stores API credentials:
   - userId
   - keyId
   - keySecret
   - createdAt

## Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/zyvex.git
   cd zyvex
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   
   # Razorpay (optional fallback)
   NEXT_PUBLIC_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Set up Clerk**
   - Create a Clerk account at https://clerk.dev
   - Create a new application
   - Configure the authentication settings
   - Set up sign-in and sign-up URLs (/sign-in and /sign-up)
   - Set after sign-in URL to /userDashboard
   - Set after sign-up URL to /userDashboard

5. **Set up MongoDB**
   - Create a MongoDB Atlas account
   - Set up a new cluster
   - Create a database named "zyvex"
   - Create collections: UserProfile, Payment, RazorpayCredentials
   - Get your connection string and add it to the .env.local file

6. **Set up Razorpay (for creators)**
   - Create a Razorpay account
   - Generate API keys for testing
   - Use the Razorpay settings in the navbar to add your credentials after signing in

7. **Run the development server**
   ```
   npm run dev
   ```

8. **Build for production**
   ```
   npm run build
   ```

9. **Start production server**
   ```
   npm start
   ```

## Project Structure

```
zyvex/
├── actions/
│   └── userActions.js       # Server actions for user operations
├── app/
│   ├── api/                 # API routes
│   │   ├── payment/         # Payment related endpoints
│   │   ├── razorpay/        # Razorpay credential management
│   │   └── user/            # User profile management
│   ├── components/          # Reusable UI components
│   │   ├── CoverPhoto.js    # Cover photo component
│   │   ├── Footer.js        # Footer component
│   │   ├── Navbar.js        # Navigation bar component
│   │   ├── PayButton.jsx    # Payment button component
│   │   ├── PaymentButton.js # Razorpay payment button
│   │   └── ToastProvider.js # Toast notification provider
│   ├── not-found.js         # 404 page
│   ├── sign-in/             # Sign-in page
│   ├── sign-up/             # Sign-up page
│   ├── userDashboard/       # User dashboard page
│   ├── about/               # About page
│   ├── layout.js            # Root layout with ClerkProvider
│   ├── page.js              # Homepage
│   └── globals.css          # Global styles
├── lib/
│   └── mongodb.js           # MongoDB connection utility
├── middleware.js            # Clerk authentication middleware
├── models/
│   ├── Payment.js           # Payment model schema
│   └── RazorpayCredentials.js # Razorpay credentials schema
├── public/                  # Static assets
│   ├── avatar.gif           # User avatar
│   ├── coffee.gif           # Coffee animation
│   ├── coin.gif             # Coin animation
│   ├── default-cover.jpg    # Default cover photo
│   ├── group.gif            # Group animation
│   ├── logoo.jpg            # Logo image
│   ├── man.gif              # User animation
│   └── rp.png               # Razorpay icon
├── .env.local               # Environment variables (not in repo)
├── .env.production          # Production environment variables
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

## Key Components and Their Functionality

### Navbar Component
- Displays the site logo and navigation options
- Handles user authentication state (signed in/out)
- Provides sign-in and sign-up buttons for unauthenticated users
- Shows dashboard access and user profile for authenticated users
- Includes the Razorpay settings modal for creators

### PaymentButton Component
- Manages the Razorpay payment flow
- Validates input fields (name, amount, message)
- Creates payment orders with the server
- Handles payment verification
- Provides error handling and loading states

### CoverPhoto Component
- Allows users to upload and change their profile cover photo
- Handles image validation (size, format)
- Manages the upload process with loading indicators
- Stores images in the database as base64 strings

### UserDashboard Page
- Displays user profile information
- Shows payment statistics (total payments, amount raised)
- Lists recent supporters with their messages
- Provides a payment form for creating new payments
- Includes preset payment amounts for quick payments

### API Routes
- **/api/user/coverphoto**: Handles cover photo upload and retrieval
- **/api/razorpay/credentials**: Manages Razorpay API credentials
- **/api/payment/webhook**: Processes payment verification callbacks

### Server Actions
- **getUserPayments**: Retrieves a user's payment history
- **createPayment**: Creates a new payment order
- **verifyPayment**: Verifies a payment's authenticity

## Implementation Details

### Authentication Flow
1. Users sign up/sign in using Clerk authentication
2. Protected routes are managed through Clerk middleware
3. User data is stored securely through Clerk's user management
4. After successful authentication, users are redirected to the dashboard
5. The middleware.js file defines which routes require authentication

### Payment Process
1. Creator sets up their Razorpay credentials through the navbar settings
2. Supporter fills out payment details (name, amount, message)
3. The createPayment server action creates an order in Razorpay
4. Payment is processed through Razorpay's secure checkout
5. Razorpay sends a callback to verify the payment
6. The webhook API endpoint verifies the signature and updates the payment status
7. Creator receives notification of the new support

### Data Storage
- User profile data is stored in MongoDB
- Payment records are stored with references to recipient and payer
- Image assets (like cover photos) are stored as base64 in MongoDB
- Razorpay credentials are securely stored with individual user associations

### Error Handling
- Client-side form validation for all input fields
- Server-side validation for security
- Timeout handling for database operations
- Graceful fallbacks for missing data
- Toast notifications for user feedback

## Deployment Configuration

### Vercel Deployment
For optimal performance on Vercel:

1. Set up environment variables in the Vercel dashboard
2. Configure build settings:
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
3. Set up custom domains if needed
4. Configure webhook URLs in Razorpay to point to your deployed API endpoint

### Production Environment Variables
Make sure to set up the following environment variables in production:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_clerk_key
CLERK_SECRET_KEY=your_production_clerk_secret
MONGODB_URI=your_production_mongodb_uri
```

## Performance Optimizations
- Image optimization with Next.js Image component
- Lazy loading of components
- Optimized MongoDB queries with timeout handling
- Server-side rendering of critical pages
- Client-side navigation for improved UX
- Strategic use of unoptimized prop for user-uploaded images

## Future Enhancements

### Planned Features
- Subscription-based support options
- Creator content publishing features
- Enhanced analytics for creators
- Direct messaging between creators and supporters
- Social sharing integration
- Multiple currency support
- Tipping options during live streams
- Customizable creator profiles with themes
- Shareable payment links
- Automated receipt generation

### Technical Roadmap
- Implement webhook reliability with queue system
- Add comprehensive testing suite
- Set up CI/CD pipeline
- Implement caching layer for frequently accessed data
- Add internationalization support
- Enhance SEO optimization

## Troubleshooting

### Common Issues
- **Payment processing failures**: Check Razorpay API keys and webhook configuration
- **Authentication errors**: Verify Clerk configuration and middleware setup
- **Image upload issues**: Check file size and format limitations
- **Database connectivity problems**: Verify MongoDB connection string and network access

### Debugging Tools
- Browser developer console for client-side issues
- Server logs for API and server action errors
- MongoDB Atlas dashboard for database monitoring
- Clerk dashboard for authentication diagnostics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Sri Surya Havanuru - Founder & Developer
