import { getRepository, Repository } from "typeorm";
import Crypto from "@/entities/crypto";

 export class CryptoRepository  {
     private repository: Repository<Crypto>;

     constructor(){
         this.repository = getRepository(Crypto);
     }

      getCryptos = async (): Promise<Crypto[] | unknown[]> => {
        const cryptoRepository = getRepository(Crypto);
        return cryptoRepository.find();
    };

      getCrypto = async (id: number): Promise<Crypto | undefined | unknown> => {
        const cryptoRepository = getRepository(Crypto);

        const crypto = await cryptoRepository.findOne({ crypto_id: id });
        if (!crypto) return undefined;

        return crypto;
    };

}
