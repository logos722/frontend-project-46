import fs from 'fs';
import * as path from 'path';

const parser = (file) => {
    const filepath = path.resolve(process.cwd(), '__fixtures__', file);
    if (filepath.endsWith('json')) return JSON.parse(fs.readFileSync(filepath));
    return 'File extension is not supported';
  };
  
  export default parser;