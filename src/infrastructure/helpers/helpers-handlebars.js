import moment from 'moment';


const formatData = (date, formato = null) => {

  const { format } = formato.hash;

  if (format) {
    return moment(date).format(`${format}`);
  }

  return moment(date).format('DD/MM/YYYY');
};

const optionSelected = (value, valueSelected) => {
  return (value === valueSelected) ? 'selected' : '';
}


module.exports = {
  formatData,
  optionSelected
}