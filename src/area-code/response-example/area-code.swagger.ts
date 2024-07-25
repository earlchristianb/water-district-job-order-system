import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export default class AreaCodeResponseSamples {
  constructor() {}
  static AreaCodeResponseBodyExample = () => {
    return {
      id: uuidv4(),
      code: randomBytes.toString().substring(0, 2).toUpperCase(),
      description: 'Area code for (name of place)',
      created_at: new Date(),
    };
  };

  static AreaCodeNotFoundResponseExample = {
    message: 'AreaCode not found',
    error: 'Not Found',
    statusCode: 404,
  };

  static AreaCodeConflictResponseExample = {
    message: 'Duplicate record',
    error: 'Conflict',
    statusCode: 409,
  };
}
