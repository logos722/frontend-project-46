import plain from './plain.js';
import stylish from './stylish.js';

const formatChoice = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown formatter: '${format}'!`);
  }
};

export default formatChoice;
