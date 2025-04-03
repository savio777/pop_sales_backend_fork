export function generatePhoneNumber(): string {
  const ddd = Math.floor(Math.random() * 90) + 10; // Gera um DDD entre 10 e 99
  const numero = Math.floor(Math.random() * 1000000000); // Gera um número de telefone com 9 dígitos
  return `(${ddd}) ${numero.toString().padStart(9, '0')}`; // Formata o número de telefone
}