/* @flow */
/* global Number */
import Masked from 'vanilla-masker';
import { isNaN } from 'underscore';

export default function Money(value, noCurrency, formatter) {
  const moneyFormatter = {
    precision: 2,
    separator: ',',
    delimiter: '.',
    unit: 'R$',
    ...formatter,
  };
  if (noCurrency === true) {
    moneyFormatter.unit = '';
  }
  if (value) {
    const number = isNaN(value) ? value : value.toFixed(2);
    return Masked.toMoney(number, moneyFormatter);
  }
  return Masked.toMoney('0.00', moneyFormatter);
}
