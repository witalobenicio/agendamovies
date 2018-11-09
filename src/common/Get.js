/**
 * @param {*} obj - Objeto a ser rastreado.
 * @param {*} key - Percurso a ser traçado.
 *
 * Exemplo:
 * var obj = { a: { b: { c: 100 } } };
 * get(obj, 'a.b.c'); // return 100.
 */

export default function Get(obj, key) {
  return key.split('.').reduce((o, x) => (typeof o === 'undefined' || o === null ? o : o[x]), obj);
}
