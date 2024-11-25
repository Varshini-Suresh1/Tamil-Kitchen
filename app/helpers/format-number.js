// app/helpers/format-number.js
import { helper } from '@ember/component/helper';

export function formatNumber([number]) {
    if (number === null || number === undefined) {
        return '';
    }
    return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 1 }).format(number);
}

export default helper(formatNumber);
