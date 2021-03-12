import { getRepository } from 'typeorm';
import { Analysis } from '@/entities/analysis';

export const getAllAnalysis = async (): Promise<Analysis[]> => {
  const analysisRepository = getRepository(Analysis);
  return analysisRepository.find();
};

export const getAnalysis = async (
  id: number
): Promise<Analysis | undefined> => {
  const analysisRepository = getRepository(Analysis);

  const analysis = await analysisRepository.findOne({ analysis_id: id });
  if (!analysis) return undefined;

  return analysis;
};
