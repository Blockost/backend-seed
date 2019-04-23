import { Entity, Column } from 'typeorm';
import BaseModel from './baseModel';

@Entity()
export default class User extends BaseModel {
  @Column()
  private firstname: string;

  @Column()
  private lastname: string;

  @Column()
  private username: string;

  constructor(firstname: string, lastname: string, username: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
  }
}
