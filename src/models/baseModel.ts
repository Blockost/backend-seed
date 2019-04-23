import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Base entity.
 *
 * This class should not decorated with @Entity because it does not represent a concrete entity
 * and should not have an associated table in database
 */

export default abstract class BaseModel {
  @PrimaryGeneratedColumn()
  private id!: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  private createdDate!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  private updatedDate!: Date;
}
