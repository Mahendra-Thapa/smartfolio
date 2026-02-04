import { createServer as createViteServer } from "vite";

export async function setupVite(app: any, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });

  // Wrap Vite middleware to ignore URI decode errors
  app.use((req: any, res: any, next: any) => {
    try {
      vite.middlewares(req, res, next);
    } catch (err) {
      if (err instanceof URIError) {
        console.warn("Malformed URI ignored:", req.url);
        res.statusCode = 400;
        res.end("Bad Request");
      } else {
        next(err);
      }
    }
  });
}
