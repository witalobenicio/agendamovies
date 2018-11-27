const errors = {
  25: 'Não foi possível realizar a operação devido a uma limitação da api. Aguarde alguns segundos e tente novamente',
};

export default function getErrorMessage(code) {
  return errors[code] || '';
}
