import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
 class Crypto {

    constructor(crypto_id: number, name: string, listing_price: number, ath: number){
        this.crypto_id = crypto_id;
        this.name = name;
        this.listing_price = listing_price;
        this.ath = ath;
    }

    @PrimaryGeneratedColumn()
    crypto_id: number;

    @Column()
    name: string;
    
    @Column()
    listing_price: number;
    
    @Column()
    ath: number;

}

export default Crypto;