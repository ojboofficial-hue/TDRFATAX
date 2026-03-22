import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log('✓ Database connection successful');
}).catch((err: Error) => {
    console.warn('⚠ Database connection failed. Running in offline mode:', err.message);
    console.warn('  To use database features, ensure MongoDB is running on', process.env.MONGODB_URI);
});

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// User model
const User = mongoose.model('User', userSchema);

// Authentication Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully.');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
});

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Middleware for verifying tokens
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// API Routes
app.get('/api/users', authenticateToken, async (_req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/api/users/:id', authenticateToken, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Other CRUD operations can be added here...

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
