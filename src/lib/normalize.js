export function normalizeString(input) {
  if (!input) {
    return ''; // ou qualquer valor padrão que você queira
  }

  return input
    .replace(/[çÇ]/g, 'C')
    .replace(/&/g, 'E')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}
