export type ResultContainer<T, E = string> = {
  status: 'success';
  data: T;
} | {
  status: 'error';
  error: E;
};
