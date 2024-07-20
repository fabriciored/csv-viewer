import { Express, Request, Response } from 'express';
import { IRepository } from '../interfaces/repository.interface';
import multer from 'multer';

export const findAll = (app: Express, route: string, repository: IRepository, model: unknown, serviceMethod: (repository: IRepository) => Promise<typeof model>) => {
    app.get(route, async (req: Request, res: Response) => {
        const users = await serviceMethod(repository);
        res.json(users);
      });
}

export const findAllWithSearchPaginated = (app: Express, route: string, repository: IRepository, model: unknown, serviceMethod: (repository: IRepository, query: string, page: number, limit: number) => Promise<typeof model>) => {
    app.get(route, async (req: Request, res: Response) => {
        const users = await serviceMethod(repository, req.query.q as string || "", req.query.page as unknown as number || 1, req.query.limit as unknown as number || -1);
        res.json(users);
      });
}

export const upload = (app: Express, route: string, uploader: multer.Multer, filename: string, repository: IRepository, fs: any, serviceMethod: (filepath: string, repository: IRepository, fs: any) => Promise<{
  result: string;
  message: string;
}>) => {
    app.post(route, uploader.single(filename), async (req: Request, res: Response) => {
      if (req.file?.mimetype !== "text/csv") {
        return res.status(400).json({message: "Only CSV files are allowed."});
      }
        const upload = await serviceMethod(req.file?.path as string, repository, fs)
        console.log(upload)
        if (upload.result == "failure") {
          return res.status(500).json({message: upload.message});
        }
        res.status(200).json({message: upload.message});
      });
}