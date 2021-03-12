import { getRepository } from 'typeorm';
import { CryptoCurrency } from '../entities/crypto';

export const getCryptos = async (): Promise<Crypto[] | unknown[]> => {
  const cryptoRepository = getRepository(CryptoCurrency);
  return cryptoRepository.find();
};

export const getCrypto = async (
  id: number
): Promise<Crypto | undefined | unknown> => {
  const cryptoRepository = getRepository(CryptoCurrency);

  const crypto = await cryptoRepository.findOne({ crypto_id: id });
  if (!crypto) return undefined;

  return crypto;
};
