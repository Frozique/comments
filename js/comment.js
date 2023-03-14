export default class Comment {
  constructor(name, text, date) {
    this.name = name;
    this.text = text;
    this.date = date;
  }

  getDate() {
    let currentTime = new Date();
    if (this.date == 'Invalid Date') {
      return `сегодня, ${currentTime.getHours()}:${currentTime.getMinutes()}`;
    } else {
      if (
        currentTime.getFullYear() - this.date.getFullYear() == 0 &&
        currentTime.getMonth() - this.date.getMonth() == 0 &&
        currentTime.getDate() - this.date.getDate() == 1
      ) {
        return `вчера, ${currentTime.getHours()}:${currentTime.getMinutes()}`;
      }
      return `${this.date.toLocaleDateString()} ${currentTime.getHours()}:${currentTime.getMinutes()}`;
    }
  }
}
