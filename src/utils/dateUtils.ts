export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const MONTH_ABBREVIATIONS: { [key: string]: string } = {
  'Janeiro': 'Jan', 'Fevereiro': 'Fev', 'Março': 'Mar',
  'Abril': 'Abr', 'Maio': 'Mai', 'Junho': 'Jun',
  'Julho': 'Jul', 'Agosto': 'Ago', 'Setembro': 'Set',
  'Outubro': 'Out', 'Novembro': 'Nov', 'Dezembro': 'Dez'
};

export const getLast12Months = (selectedMonth: string, selectedYear: number) => {
  const months = [];
  const currentMonthIndex = MONTHS.indexOf(selectedMonth);
  const currentYear = selectedYear;

  for (let i = 11; i >= 0; i--) {
    let monthIndex = currentMonthIndex - i;
    let year = currentYear;

    if (monthIndex < 0) {
      monthIndex += 12;
      year--;
    }

    months.push({
      month: MONTHS[monthIndex],
      year: year
    });
  }

  return months;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const calculateMonthsAsCostumer = (startDate: string) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + 
    (now.getMonth() - start.getMonth());
  return Math.max(0, diffInMonths);
};