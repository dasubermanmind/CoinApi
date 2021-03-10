import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import Crypto from "../entities/crypto";
import { CryptoRepository } from '../Repository/CryptoRepository';

 const FinanceController  = () => {
   const crypto: CryptoRepository = new CryptoRepository();

   const getAll = async (request: Request, response: Response): Promise<Response> => {
       try {
            const resp= crypto.getCryptos();
            if (!resp) return null;
            response.status(200).send(resp);
        } catch (error) {
            console.error(error);
            return response.sendStatus(500);
        }
    }

  const  get = async (request: Request, response: Response): Promise<Response>=>{
        try {
            const { id } = request.params;
            const resp= crypto.getCrypto(parseInt(id));
            return response.status(200).send(resp);
        } catch (error) {
            console.error(error);
            return response.sendStatus(500);
        }
    }
}

export default FinanceController;

