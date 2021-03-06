import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Analysis } from './analysis';

@Entity()
export class CryptoCurrency {
  constructor(
    name: string,
    listing_price: number,
    ath: number,
    crypto_analysis: Analysis[]
  ) {
    this.name = name;
    this.listing_price = listing_price;
    this.ath = ath;
    this.crypto_analysis = crypto_analysis;
  }

  @PrimaryGeneratedColumn()
  crypto_id: number;

  @Column()
  name: string;

  @Column()
  listing_price: number;

  @Column()
  ath: number;

  @OneToMany((type) => Analysis, (analysis) => analysis.compute)
  crypto_analysis: Analysis[];
}
