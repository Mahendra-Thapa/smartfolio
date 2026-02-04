import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { storage, Portfolio } from "./storage";

describe("Storage Utility", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("createNewPortfolio", () => {
    it("should create a new portfolio with default values", () => {
      const portfolio = storage.createNewPortfolio();

      expect(portfolio).toBeDefined();
      expect(portfolio.id).toBeDefined();
      expect(portfolio.name).toBe("");
      expect(portfolio.title).toBe("");
      expect(portfolio.intro).toBe("");
      expect(portfolio.email).toBe("");
      expect(portfolio.phone).toBe("");
      expect(portfolio.education).toEqual([]);
      expect(portfolio.skills).toEqual([]);
      expect(portfolio.experience).toEqual([]);
      expect(portfolio.templateId).toBe("professional");
      expect(portfolio.colorScheme).toBe("blue");
    });
  });

  describe("savePortfolio", () => {
    it("should save a new portfolio to localStorage", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "John Doe";
      portfolio.title = "Developer";

      storage.savePortfolio(portfolio);

      const saved = storage.getPortfolio(portfolio.id);
      expect(saved).toBeDefined();
      expect(saved?.name).toBe("John Doe");
      expect(saved?.title).toBe("Developer");
    });

    it("should update an existing portfolio", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "John Doe";
      storage.savePortfolio(portfolio);

      portfolio.name = "Jane Doe";
      storage.savePortfolio(portfolio);

      const saved = storage.getPortfolio(portfolio.id);
      expect(saved?.name).toBe("Jane Doe");
    });
  });

  describe("getPortfolio", () => {
    it("should retrieve a saved portfolio", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "Test User";
      storage.savePortfolio(portfolio);

      const retrieved = storage.getPortfolio(portfolio.id);
      expect(retrieved).toBeDefined();
      expect(retrieved?.name).toBe("Test User");
    });

    it("should return null for non-existent portfolio", () => {
      const retrieved = storage.getPortfolio("non-existent-id");
      expect(retrieved).toBeNull();
    });
  });

  describe("getAllPortfolios", () => {
    it("should return empty array when no portfolios exist", () => {
      const portfolios = storage.getAllPortfolios();
      expect(portfolios).toEqual([]);
    });

    it("should return all saved portfolios", () => {
      const p1 = storage.createNewPortfolio();
      p1.name = "Portfolio 1";
      storage.savePortfolio(p1);

      const p2 = storage.createNewPortfolio();
      p2.name = "Portfolio 2";
      storage.savePortfolio(p2);

      const portfolios = storage.getAllPortfolios();
      expect(portfolios).toHaveLength(2);
      expect(portfolios.map((p) => p.name)).toContain("Portfolio 1");
      expect(portfolios.map((p) => p.name)).toContain("Portfolio 2");
    });
  });

  describe("deletePortfolio", () => {
    it("should delete a portfolio from localStorage", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "Test User";
      storage.savePortfolio(portfolio);

      expect(storage.getPortfolio(portfolio.id)).toBeDefined();

      storage.deletePortfolio(portfolio.id);

      expect(storage.getPortfolio(portfolio.id)).toBeNull();
    });

    it("should not affect other portfolios when deleting", () => {
      const p1 = storage.createNewPortfolio();
      p1.name = "Portfolio 1";
      storage.savePortfolio(p1);

      const p2 = storage.createNewPortfolio();
      p2.name = "Portfolio 2";
      storage.savePortfolio(p2);

      storage.deletePortfolio(p1.id);

      const remaining = storage.getAllPortfolios();
      expect(remaining).toHaveLength(1);
      expect(remaining[0]?.name).toBe("Portfolio 2");
    });
  });
});

  describe("duplicatePortfolio", () => {
    it("should create a copy of an existing portfolio", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "Original Portfolio";
      portfolio.title = "Software Engineer";
      portfolio.intro = "Passionate developer";
      portfolio.email = "test@example.com";
      portfolio.skills = ["React", "TypeScript", "Node.js"];
      portfolio.templateId = "modern";
      portfolio.colorScheme = "purple";

      storage.savePortfolio(portfolio);

      const duplicated = storage.duplicatePortfolio(portfolio.id);

      expect(duplicated).not.toBeNull();
      expect(duplicated?.id).not.toBe(portfolio.id);
      expect(duplicated?.name).toBe("Original Portfolio (Copy)");
      expect(duplicated?.title).toBe(portfolio.title);
      expect(duplicated?.intro).toBe(portfolio.intro);
      expect(duplicated?.email).toBe(portfolio.email);
      expect(duplicated?.skills).toEqual(portfolio.skills);
      expect(duplicated?.templateId).toBe(portfolio.templateId);
      expect(duplicated?.colorScheme).toBe(portfolio.colorScheme);
    });

    it("should save the duplicated portfolio to storage", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "Test Portfolio";
      portfolio.skills = ["JavaScript", "React"];

      storage.savePortfolio(portfolio);

      const duplicated = storage.duplicatePortfolio(portfolio.id);

      const allPortfolios = storage.getAllPortfolios();
      expect(allPortfolios.length).toBe(2);
      expect(allPortfolios.some((p) => p.id === duplicated?.id)).toBe(true);
    });

    it("should return null if portfolio does not exist", () => {
      const result = storage.duplicatePortfolio("nonexistent-id");
      expect(result).toBeNull();
    });

    it("should clone all portfolio data including education and experience", () => {
      const portfolio = storage.createNewPortfolio();
      portfolio.name = "Complex Portfolio";
      portfolio.education = [
        {
          institution: "MIT",
          degree: "Bachelor",
          field: "Computer Science",
          year: "2020",
        },
      ];
      portfolio.experience = [
        {
          company: "Google",
          position: "Software Engineer",
          duration: "2020-2023",
          description: "Built scalable systems",
        },
      ];
      portfolio.qualifications = ["AWS Certified", "Google Cloud Certified"];

      storage.savePortfolio(portfolio);

      const duplicated = storage.duplicatePortfolio(portfolio.id);

      expect(duplicated?.education).toEqual(portfolio.education);
      expect(duplicated?.experience).toEqual(portfolio.experience);
      expect(duplicated?.qualifications).toEqual(portfolio.qualifications);
    });
  });
});
