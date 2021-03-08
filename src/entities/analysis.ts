import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import Crypto from "./crypto";

@Entity({name: 'analysis'})
class Analysis{

    constructor(analysis_id: number ,
                prediction_percentage: string,
                compute: Crypto){
        this.analysis_id = analysis_id;
        this.prediction_percentage = prediction_percentage;
        this.compute = compute;
    }

    @PrimaryGeneratedColumn()
    analysis_id: number;

    @Column()
    prediction_percentage: string;

    @ManyToOne((type)=> Crypto, (crypt)=>crypt.crypto_analysis)
    compute: Crypto;
}

export default Analysis;
