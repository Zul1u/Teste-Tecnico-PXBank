// Explicação do calculo para a validação do CPF
// https://www.devmedia.com.br/validar-cpf-com-javascript/23916

// Este codigo foi gerado pelo chat GPT
function validateCPF(cpf) {
  const cpfClean = cpf.replace(/[^\d]/g, '');

  for (let i = 0; i < 10; i += 1) {
    if (cpfClean.charAt(i) !== cpfClean.charAt(i + 1)) {
      break;
    }
    if (i === 9) {
      return false;
    }
  }

  if (cpfClean.length !== 11) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(cpfClean[i - 1], 10) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpfClean[9], 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i += 1) {
    sum += parseInt(cpfClean[i - 1], 10) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpfClean[10], 10)) {
    return false;
  }

  return true;
}

// https://pt.stackoverflow.com/questions/218989/formatar-sequencia-num%C3%A9rica-em-formato-cpf-com-separadores-usando-javascript
function formatCPF(cpf) {
  let formatedCpf = cpf.replace(/\D/g, '');
  formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, '$1.$2');
  formatedCpf = formatedCpf.replace(/(\d{3})(\d)/, '$1.$2');
  formatedCpf = formatedCpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return formatedCpf;
}

export { validateCPF, formatCPF };
