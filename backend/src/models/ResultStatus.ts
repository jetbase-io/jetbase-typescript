import { RESULT_STATUSES } from 'src/constants/common';

export type ResultStatus = typeof RESULT_STATUSES[keyof typeof RESULT_STATUSES];
