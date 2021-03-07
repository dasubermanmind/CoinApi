import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import Crypto from "../entities/crypto";

export default class FinanceController {
    private repository: Repository<Crypto>;

    constructor( ){
        this.repository = getRepository(Crypto);
    }
    /*
    * There are 5 different QueryBuilder types available:
    * SelectQueryBuilder
    * InsertQueryBuilder
    * UpdateQueryBuilder
    * DeleteQueryBuilder
    * RelationQueryBuilder
    * */

    getAll = async (request: Request, response: Response): Promise<Response> => {
        try {
            const cryptos = await this.repository.createQueryBuilder("crypto")
                .getMany();
            return response.status(200).send(cryptos);
        } catch (error) {
            console.error(error);
            return response.sendStatus(500);
        }
    }

    get = async (request: Request, response: Response): Promise<Response>=>{
        try {
            const { id } = request.params;
            const crypto = await this.repository.findOne(id);
            if (!crypto) {
                return response.status(400).send("No cryptocurrencies found with that name");
            }
            return response.status(200).send(crypto);
        } catch (error) {
            console.error(error);
            return response.sendStatus(500);
        }
    }





}

