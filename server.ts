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

// In-memory user store for offline/demo mode
interface UserData {
  _id: string;
  username: string;
  password: string;
}

let dbConnected = false;
const inMemoryUsers: UserData[] = [];

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI as string).then(() => {
    console.log('✓ Database connection successful');
    dbConnected = true;
}).catch((_err: Error) => {
    console.warn('⚠ Database connection failed. Running in DEMO MODE with in-memory storage');
    console.warn('  To use persistent database, ensure MongoDB is running on', process.env.MONGODB_URI);
    dbConnected = false;
});

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// User model
const User = mongoose.model('User', userSchema);

// Authentication Routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (dbConnected) {
            // Use MongoDB
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully.' });
        } else {
            // Use in-memory storage
            const existingUser = inMemoryUsers.find(u => u.username === username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            const newUser: UserData = {
                _id: Math.random().toString(36).substr(2, 9),
                username,
                password: hashedPassword,
            };
            inMemoryUsers.push(newUser);
            res.status(201).json({ message: 'User registered successfully.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        let user;

        if (dbConnected) {
            // Use MongoDB
            user = await User.findOne({ username });
        } else {
            // Use in-memory storage
            user = inMemoryUsers.find(u => u.username === username);
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );
        res.json({ token, username: user.username });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
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
    try {
        let users;
        if (dbConnected) {
            users = await User.find();
        } else {
            users = inMemoryUsers.map(({ password, ...user }) => user);
        }
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        let user;
        if (dbConnected) {
            user = await User.findById(req.params.id);
        } else {
            user = inMemoryUsers.find(u => u._id === req.params.id);
        }
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        mode: dbConnected ? 'production' : 'demo',
        timestamp: new Date().toISOString(),
    });
});

// Other CRUD operations can be added here...

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
