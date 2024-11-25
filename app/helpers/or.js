import { helper } from '@ember/component/helper';

export function or(params) {
    return params.some(Boolean);
}

export default helper(or);
