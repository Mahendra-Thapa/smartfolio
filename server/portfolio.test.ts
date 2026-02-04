import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

function createTestContext(user: User): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

const testUser: User = {
  id: 1,
  openId: "test-user-1",
  email: "test@example.com",
  name: "Test User",
  loginMethod: "manus",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

describe("Portfolio API", () => {
  describe("portfolio.list", () => {
    it("should return empty list for user with no portfolios", async () => {
      const ctx = createTestContext(testUser);
      const caller = appRouter.createCaller(ctx);

      const portfolios = await caller.portfolio.list();
      expect(Array.isArray(portfolios)).toBe(true);
    });
  });

  describe("portfolio.create", () => {
    it("should create a new portfolio", async () => {
      const ctx = createTestContext(testUser);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.create({
        title: "My Test Portfolio",
        description: "A test portfolio",
        templateId: "professional",
        userProfile: "student",
      });

      expect(result).toBeDefined();
    });

    it("should reject creation without title", async () => {
      const ctx = createTestContext(testUser);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.portfolio.create({
          title: "",
          description: "A test portfolio",
          templateId: "professional",
          userProfile: "student",
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("template.list", () => {
    it("should return list of templates", async () => {
      const caller = appRouter.createCaller({} as TrpcContext);
      const templates = await caller.template.list();

      expect(Array.isArray(templates)).toBe(true);
    });
  });
});
