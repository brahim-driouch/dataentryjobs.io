

const isPlainObject = (value: any) => {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp) &&
    !(value instanceof Map) &&
    !(value instanceof Set)
  );
}

export const dataTransformerToCamelCase = (data: any): any => {
  // Base case: primitive values
if(!isPlainObject(data)){
    return data;
}
  
  // Transform plain object keys
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    // Convert snake_case to camelCase
    // Handles: user_primary_email, _id, __version, a_b_c_d
    const camelKey = key
      .replace(/^_+/, '') // Remove leading underscores
      .replace(/_+([a-z])/g, (_, letter) => letter.toUpperCase()) // Convert _x to X
      .replace(/_+/g, ''); // Clean up any remaining underscores
    
    // Preserve the key if it's already in camelCase or PascalCase
    const finalKey = camelKey || key;
    
    result[finalKey] = dataTransformerToCamelCase(value);
  }
  
  return result;
};

export const dataTransformerToSnakeCase = (data: any): any => {
  // Base case: non-objects (including arrays that we'll handle separately)
if(!isPlainObject(data)){
    return data;
}
  // Transform plain objects
  const result: Record<string, any> = {};
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Better key transformation that handles edge cases
      const snakeKey = key
        .replace(/([a-z])([A-Z])/g, '$1_$2')  // Add underscore between lowercase and uppercase
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')  // Handle acronyms: HTTPRequest -> http_request
        .toLowerCase();
      
      result[snakeKey] = dataTransformerToSnakeCase(data[key]);
    }
  }
  
  return result;
};
