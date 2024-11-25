import { helper } from '@ember/component/helper';

export function formatDate([timestamp]) {
  const date = new Date(timestamp * 1000); //Timestamp is in seconds
  return date.toLocaleDateString(); 
}

export default helper(formatDate);
