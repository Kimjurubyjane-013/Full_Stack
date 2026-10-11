import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data directory and database storage file
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// In-memory active database state
let database = {
  users: [],
  items: [],
  activities: [],
};

/**
 * Persists current database state to disk atomically
 */
async function saveToDisk() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(database, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Database Error] Failed to write to disk:', err.message);
  }
}

/**
 * Initializes database connection, loads disk storage, and seeds initial data if empty.
 */
export async function connectDB() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    try {
      const raw = await fs.readFile(DB_FILE, 'utf-8');
      database = JSON.parse(raw);
      console.log('[Database] Connected to persistent storage at', DB_FILE);
    } catch (err) {
      // File does not exist yet; will seed below
      console.log('[Database] Initializing fresh database storage...');
    }

    // Seed database if empty
    await seedDatabase();
    return database;
  } catch (err) {
    console.error('[Database] Connection failure:', err.message);
    throw err;
  }
}

/**
 * Seed initial users and sample CRUD items
 */
async function seedDatabase() {
  let modified = false;

  if (!database.users || database.users.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const adminPasswordHash = await bcrypt.hash('Admin123!', salt);
    const demoPasswordHash = await bcrypt.hash('Demo123!', salt);

    database.users = [
      {
        id: 'usr-admin-01',
        name: 'System Admin',
        email: 'admin@example.com',
        password: adminPasswordHash,
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-demo-02',
        name: 'Alex Demo',
        email: 'demo@example.com',
        password: demoPasswordHash,
        role: 'developer',
        createdAt: new Date().toISOString(),
      },
    ];
    modified = true;
    console.log('[Database] Seeded default users (admin@example.com, demo@example.com)');
  }

  if (!database.items || database.items.length === 0) {
    database.items = [
      {
        id: 'item-001',
        title: 'Authentication Module',
        description: 'JWT-based token issuance, refresh tokens, and route protection guards.',
        category: 'Security',
        status: 'completed',
        priority: 'high',
        createdBy: 'usr-admin-01',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'item-002',
        title: 'Microservices REST API',
        description: 'Modular endpoints for user profiles, items, health monitoring, and analytics.',
        category: 'Backend',
        status: 'in-progress',
        priority: 'critical',
        createdBy: 'usr-admin-01',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'item-003',
        title: 'Responsive Dashboard UI',
        description: 'React components with Tailwind CSS styling and live API diagnostics.',
        category: 'Frontend',
        status: 'completed',
        priority: 'medium',
        createdBy: 'usr-demo-02',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'item-004',
        title: 'CI/CD Pipeline Automation',
        description: 'GitHub Actions validating multi-tier workspace builds on every PR.',
        category: 'DevOps',
        status: 'completed',
        priority: 'high',
        createdBy: 'usr-admin-01',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    modified = true;
    console.log('[Database] Seeded 4 default items');
  }

  if (modified) {
    await saveToDisk();
  }
}

/**
 * Data Access Models & Repositories
 */
export const UserModel = {
  async findByEmail(email) {
    return database.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  async findById(id) {
    const user = database.users.find((u) => u.id === id);
    if (!user) return null;
    const { password, ...sanitized } = user;
    return sanitized;
  },

  async create({ name, email, password, role = 'developer' }) {
    const newUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      email: email.toLowerCase(),
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    database.users.push(newUser);
    await saveToDisk();
    const { password: _, ...sanitized } = newUser;
    return sanitized;
  },
};

export const ItemModel = {
  async findAll({ category, status, search } = {}) {
    let results = [...database.items];

    if (category) {
      results = results.filter((i) => i.category.toLowerCase() === category.toLowerCase());
    }
    if (status) {
      results = results.filter((i) => i.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findById(id) {
    return database.items.find((i) => i.id === id) || null;
  },

  async create(data) {
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: data.title,
      description: data.description || '',
      category: data.category || 'General',
      status: data.status || 'pending',
      priority: data.priority || 'medium',
      createdBy: data.createdBy || 'anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    database.items.push(newItem);
    await saveToDisk();
    return newItem;
  },

  async update(id, updates) {
    const index = database.items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    database.items[index] = {
      ...database.items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await saveToDisk();
    return database.items[index];
  },

  async delete(id) {
    const index = database.items.findIndex((i) => i.id === id);
    if (index === -1) return false;

    database.items.splice(index, 1);
    await saveToDisk();
    return true;
  },
};

export default {
  connectDB,
  UserModel,
  ItemModel,
};
