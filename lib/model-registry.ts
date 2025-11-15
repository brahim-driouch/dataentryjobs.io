import mongoose from 'mongoose';

const modelRegistry = new Map();

export function getOrCreateModel<T>(modelName: string, schema: mongoose.Schema): T {
  if (modelRegistry.has(modelName)) {
    return modelRegistry.get(modelName);
  }
  
  const model = mongoose.model<T>(modelName, schema);
  modelRegistry.set(modelName, model);
  return model;
}