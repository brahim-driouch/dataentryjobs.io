// utils/updateHelpers.ts
export const createDotNotationUpdate = (
  data: any, 
  parentKey = '',
  options: { 
    skipNull?: boolean; 
    skipUndefined?: boolean;
    skipEmptyStrings?: boolean; // Add this option
  } = {}
): Record<string, any> => {
  const result: Record<string, any> = {};
  const { 
    skipNull = true, 
    skipUndefined = true,
    skipEmptyStrings = true // Default to true
  } = options;
  
  const isPlainObject = (obj: any): boolean => {
    return obj !== null && 
           typeof obj === 'object' && 
           !Array.isArray(obj) && 
           !(obj instanceof Date);
  };
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    
    // Skip based on options
    if (value === null && skipNull) return;
    if (value === undefined && skipUndefined) return;
    if (value === '' && skipEmptyStrings) return; // Skip empty strings
    
    if (isPlainObject(value)) {
      Object.assign(result, createDotNotationUpdate(value, fullKey, options));
    } else {
      result[fullKey] = value;
    }
  });
  
  return result;
};