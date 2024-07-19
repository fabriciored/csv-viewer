import { Express, Request, Response } from 'express';
import { IRepository } from '../interfaces/repository.interface';
import multer from 'multer';

export const findAll = (app: Express, route: string, repository: IRepository, model: unknown, serviceMethod: (repository: IRepository) => Promise<typeof model>) => {
    app.get(route, async (req: Request, res: Response) => {
        const users = await serviceMethod(repository);
        res.json(users);
      });
}

export const upload = (app: Express, route: string, uploader: multer.Multer, filename: string, repository: IRepository, fs: any, serviceMethod: (filepath: string, repository: IRepository, fs: any) => Promise<void>) => {
    app.post(route, uploader.single(filename), async (req: Request, res: Response) => {
        const users = await serviceMethod(req.file?.path as string, repository, fs);
        res.json(users);
      });
}