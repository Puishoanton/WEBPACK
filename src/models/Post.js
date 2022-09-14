

export default class Post {
  constructor(title, logo) {
    this.title = title
    this.logo = logo
    this.date = new Date()
  }
  toString() {
    return JSON.stringify(
      {
        title: this.title,
        date: this.date.toJSON(),
        logo: this.logo,
      },
      null,
      2
    )
  }
  get toUpperCaseTitle() {
    return this.title.toUpperCase()
  }
}
