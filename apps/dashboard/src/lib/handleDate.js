/**
 * Handle Date
 *
 * @class
 * @description Handle Date Format
 */
class HandleDate {
  /**
     * Get GMT Date
     *
     * @static
     * @param {String} stringDate
     *
     * @return {String}
     */
  static getGMTDate(stringDate) {
    const date = new Date(stringDate || Date.now());
    const year = date.getFullYear();
    const day = date.getDate();

    let month;
    switch (date.getMonth()) {
      case 0:
        month = 'Enero';
        break;
      case 1:
        month = 'Febrero';
        break;
      case 2:
        month = 'Marzo';
        break;
      case 3:
        month = 'Abril';
        break;
      case 4:
        month = 'Mayo';
        break;
      case 5:
        month = 'Junio';
        break;
      case 6:
        month = 'Julio';
        break;
      case 7:
        month = 'Agosto';
        break;
      case 8:
        month = 'Septiembre';
        break;
      case 9:
        month = 'Octubre';
        break;
      case 10:
        month = 'Noviembre';
        break;
      case 11:
        month = 'Diciembre';
        break;
      default: break;
    }
    return `${day} de ${month}, ${year}`;
  }
}

module.exports = HandleDate;
