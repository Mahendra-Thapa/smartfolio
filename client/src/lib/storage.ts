export interface Portfolio {
  id: string;
  name: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  skills: string[];
  qualifications: string[];
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  additionalExperience: string;
  projects: Array<{
    title: string;
    role: string;
    duration: string;
    description: string;
    link: string;
    image?: File | string;
  }>;
  templateId: string;
  colorScheme: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "smartfolio_portfolios";

export const storage = {
  getAllPortfolios: (): Portfolio[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading portfolios:", error);
      return [];
    }
  },

  getPortfolio: (id: string): Portfolio | null => {
    try {
      const portfolios = storage.getAllPortfolios();
      return portfolios.find((p) => p.id === id) || null;
    } catch (error) {
      console.error("Error getting portfolio:", error);
      return null;
    }
  },

  savePortfolio: (portfolio: Portfolio): void => {
    try {
      const portfolios = storage.getAllPortfolios();
      const existingIndex = portfolios.findIndex((p) => p.id === portfolio.id);

      if (existingIndex >= 0) {
        portfolios[existingIndex] = {
          ...portfolio,
          updatedAt: new Date().toISOString(),
        };
      } else {
        portfolios.push({
          ...portfolio,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  },

  deletePortfolio: (id: string): void => {
    try {
      const portfolios = storage.getAllPortfolios();
      const filtered = portfolios.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  },

  createNewPortfolio: (): Portfolio => {
    const id = Date.now().toString();
    return {
      id,
      name: "",
      title: "",
      intro: "",
      email: "",
      phone: "",
      education: [],
      skills: [],
      qualifications: [],
      experience: [],
      additionalExperience: "",
       projects: [],
      templateId: "professional",
      colorScheme: "blue",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  duplicatePortfolio: (id: string): Portfolio | null => {
    try {
      const original = storage.getPortfolio(id);
      if (!original) return null;

      const newId = Date.now().toString();
      const duplicated: Portfolio = {
        ...original,
        id: newId,
        name: original.name + " (Copy)",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      storage.savePortfolio(duplicated);
      return duplicated;
    } catch (error) {
      console.error("Error duplicating portfolio:", error);
      return null;
    }
  },
};
