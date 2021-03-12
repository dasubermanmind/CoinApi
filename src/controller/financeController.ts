import { Request, Response } from 'express';
import { getCryptos, getCrypto } from '../Repository/CryptoRepository';

export default class FinanceController {
  getAll = async (request: Request, response: Response): Promise<Response> => {
    try {
      const resp = getCryptos();
      if (!resp) return null;
      response.status(200).send(resp);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  };

  get = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const resp = getCrypto(parseInt(id));
      return response.status(200).send(resp);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  };
}
