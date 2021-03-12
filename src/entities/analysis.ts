import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CryptoCurrency } from './crypto';

@Entity({ name: 'analysis' })
export class Analysis {
  constructor(
    analysis_id: number,
    prediction_percentage: string,
    compute: CryptoCurrency
  ) {
    this.analysis_id = analysis_id;
    this.prediction_percentage = prediction_percentage;
    this.compute = compute;
  }

  @PrimaryGeneratedColumn()
  analysis_id: number;

  @Column()
  prediction_percentage: string;

  @ManyToOne((type) => CryptoCurrency, (crypt) => crypt.crypto_analysis)
  compute: CryptoCurrency;
}
