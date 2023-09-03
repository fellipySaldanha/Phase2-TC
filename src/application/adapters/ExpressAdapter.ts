import express, { Request, Response } from 'express';
import HttpServer from '../ports/HttpServer';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';

export default class ExpressAdapter implements HttpServer {
  server: any;

  constructor() {
    this.server = express();
    this.middleware();
  }

  listen(port: number): void {
    return this.server.listen(port);
  }

  private middleware() {
    this.server.use(express.json());
    this.server.use(
      '/api-docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocument),
    );
    // this.server.use(
    //   (
    //     req: { url: string },
    //     res: { redirect: (arg0: string) => void },
    //     next: () => void,
    //   ) => {
    //     if (req.url == '/') {
    //       res.redirect('/api-docs');
    //     }
    //   },
    // );
  }

  public router(route: any) {
    this.server.use(route);
  }

  async register(
    method: string,
    url: string,
    callback: Function,
  ): Promise<void> {
    this.server[method](url, async function (req: Request, res: Response) {
      await callback(req, res);
    });
  }
}
