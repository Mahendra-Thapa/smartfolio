import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, portfolios, portfolioData, portfolioTemplates, InsertPortfolio, InsertPortfolioData } from "../drizzle/schema";
import { ENV } from './_core/env';
import type { Portfolio, PortfolioData } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserPortfolios(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get portfolios: database not available");
    return [];
  }

  try {
    const result = await db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user portfolios:", error);
    return [];
  }
}

export async function getPortfolioById(portfolioId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get portfolio: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(portfolios).where(eq(portfolios.id, portfolioId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get portfolio:", error);
    return undefined;
  }
}

export async function getPortfolioData(portfolioId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get portfolio data: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(portfolioData).where(eq(portfolioData.portfolioId, portfolioId)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get portfolio data:", error);
    return undefined;
  }
}

export async function createPortfolio(portfolio: InsertPortfolio) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create portfolio: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(portfolios).values(portfolio);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create portfolio:", error);
    throw error;
  }
}

export async function updatePortfolio(portfolioId: number, updates: Partial<InsertPortfolio>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update portfolio: database not available");
    return undefined;
  }

  try {
    const result = await db.update(portfolios).set(updates).where(eq(portfolios.id, portfolioId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update portfolio:", error);
    throw error;
  }
}

export async function deletePortfolio(portfolioId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete portfolio: database not available");
    return undefined;
  }

  try {
    await db.delete(portfolioData).where(eq(portfolioData.portfolioId, portfolioId));
    const result = await db.delete(portfolios).where(eq(portfolios.id, portfolioId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete portfolio:", error);
    throw error;
  }
}

export async function upsertPortfolioData(portfolioId: number, data: Partial<InsertPortfolioData>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert portfolio data: database not available");
    return undefined;
  }

  try {
    const existing = await db.select().from(portfolioData).where(eq(portfolioData.portfolioId, portfolioId)).limit(1);
    
    if (existing.length > 0) {
      const result = await db.update(portfolioData).set(data).where(eq(portfolioData.portfolioId, portfolioId));
      return result;
    } else {
      const result = await db.insert(portfolioData).values({ portfolioId, ...data });
      return result;
    }
  } catch (error) {
    console.error("[Database] Failed to upsert portfolio data:", error);
    throw error;
  }
}

export async function getPortfolioTemplates() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get templates: database not available");
    return [];
  }

  try {
    const result = await db.select().from(portfolioTemplates);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get templates:", error);
    return [];
  }
}
