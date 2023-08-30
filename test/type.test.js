import { stringify } from '../src/db/Schema/types';

describe('Schema', function () {
  test('stringify', function () {
    const testSchema = {
      string0: 'string',
      string1: String,
      string3: { type: 'string' },
      string2: { type: String },
      string4: { type: 'string', default: 'default' },
      string5: {
        type: String,
        default: 'default',
        required: true,
      },
      string6: {
        type: String,
        required: true,
      },
      string7: {
        type: String,
      },
    };
  });
});
