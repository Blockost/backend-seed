export default class User {
  private firstname: string;
  private lastname: string;
  private username: string;

  constructor(firstname: string, lastname: string, username: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
  }
}
