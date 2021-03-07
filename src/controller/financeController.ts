import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import Crypto from "../entities/crypto";


class FinanceController {
    private repository: Repository<Crypto> | undefined;

    constructor( ){

        // this.repository = getRepository(Crypto);
    }


     testRepo(){
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

    // Define functionality of the API
    getAll = async (request: Request, response: Response): Promise<void> =>{
        let cryptoQuery = request.query;
        let query = this.repository && this.repository.createQueryBuilder("crypto");

        // const result = await query && query.getMany();
        // return response.send(result);
    }

    /*
    get = async (request: Request, response: Response): Promise<Response>=>{
        const { id } = request.params;
        // validate it
        // query it
        // return it
    }

     */
}

export default FinanceController;

