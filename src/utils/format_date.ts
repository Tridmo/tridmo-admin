export default function formatDate(date: Date | string, include_time: boolean = false): string {

  const dt = new Date(date)

  const dd = dt.getDate()
  const mm = dt.getMonth() + 1
  const yyyy = dt.getFullYear()
  const hour = dt.getHours()
  const minutes = dt.getMinutes()

  let formatted = `${dd < 10 ? '0' + dd : dd}.${mm < 10 ? '0' + mm : mm}.${yyyy}`

  if (include_time) formatted += ` ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`

  return formatted;
}

export function currentDate(date?: Date) {
  date = date || new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const week = getWeek(date);

  return {
    date, year, month, week
  }
}

export function getWeek(date?: Date, dowOffset?): number {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  date = date || new Date();

  dowOffset = typeof (dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(date.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((date.getTime() - newYear.getTime() -
    (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      let nYear = new Date(date.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  }
  else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};