export const AgendaHora = async () => {
  const date = new Date();
  var data2 = new Date();
  var data3 = new Date();
  const horas = date.getHours();
  const minutos = date.getMinutes();
  const tempoA = horas + ":" + minutos;
  const diaA = date.getDate();
  const diaB = data3.getDate();
  const mesA =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const anoA = date.getFullYear();
  
  if (date.getDay() === 0) {
    data2.setHours("9");
    data2.setMinutes("0");
    data2.setDate(data2.getDate() + 1);
  }
  if (date.getDay() === 6) {
    data2.setHours("9");
    data2.setMinutes("0");
    data2.setDate(data2.getDate() + 2);
  }
  if (
    (date.getHours() > "9" && date.getMinutes() === "0") ||
    date.getHours() < "16"
  ) {
    data2.setHours(data2.getHours() + 1);
  }
  if (date.getHours() < "9" && date.getMinutes() === "0") {
    data2.setHours("9");
    data2.setMinutes("0");
  }

  if (date.getHours() > "16" && diaA === diaB) {
    data2.setHours("9");
    data2.setMinutes("0");
    data2.setDate(data2.getDate() + 1);
  }

  if (date.getHours() > "16" && date.getDay() === 5) {
    data2.setHours("9");
    data2.setMinutes("0");
    data2.setDate(data2.getDate() + 2);
  }
  if (date.getDay() === 6 || date.getDay() === 0) {
    data2.setHours("9");
    data2.setMinutes("0");
  }

  const dia = data2.getDate();
  const mes =
    data2.getMonth() + 1 > 9
      ? data2.getMonth() + 1
      : "0" + (data2.getMonth() + 1);
  const ano = data2.getFullYear();
  const h2 = data2.getHours();
  const horasa = 
    h2 < "10"
      ? "0" + h2
      : h2 === "0"
      ? "0" + h2
      : data2.getHours();

  const minutosa =
    data2.getMinutes() < "10" ? "0" + data2.getMinutes() : data2.getMinutes();

  const resultA = diaA + "-" + mesA + "-" + anoA;
  const result = ano + "-" + mes + "-" + dia;
  const resultB = dia + "/" + mes + "/" + ano;
  const tempo = horasa + ":" + minutosa;

  const resposta = {
    dtagend: result,
    agendVisual: resultB,
    htagenda: tempo,
    dtatual: resultA,
    htAtual: tempoA
  };

  return resposta;
};
