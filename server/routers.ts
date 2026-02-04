import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserPortfolios, getPortfolioById, getPortfolioData, createPortfolio, updatePortfolio, deletePortfolio, upsertPortfolioData, getPortfolioTemplates } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  portfolio: router({
    list: protectedProcedure.query(({ ctx }) => getUserPortfolios(ctx.user.id)),
    
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => getPortfolioById(input.id)),
    
    getData: protectedProcedure
      .input(z.object({ portfolioId: z.number() }))
      .query(async ({ input }) => getPortfolioData(input.portfolioId)),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        templateId: z.string(),
        userProfile: z.enum(["student", "fresher", "professional"]),
      }))
      .mutation(async ({ ctx, input }) => {
        return createPortfolio({
          userId: ctx.user.id,
          title: input.title,
          description: input.description,
          templateId: input.templateId,
          userProfile: input.userProfile,
        });
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        templateId: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return updatePortfolio(input.id, {
          title: input.title,
          description: input.description,
          templateId: input.templateId,
          status: input.status,
        });
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => deletePortfolio(input.id)),
    
    updateData: protectedProcedure
      .input(z.object({
        portfolioId: z.number(),
        aboutMe: z.string().optional(),
        skills: z.string().optional(),
        experience: z.string().optional(),
        education: z.string().optional(),
        projects: z.string().optional(),
        socialLinks: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { portfolioId, ...data } = input;
        return upsertPortfolioData(portfolioId, data);
      }),
  }),

  template: router({
    list: publicProcedure.query(() => getPortfolioTemplates()),
  }),
});

export type AppRouter = typeof appRouter;
