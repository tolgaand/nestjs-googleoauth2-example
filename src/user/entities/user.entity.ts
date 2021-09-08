import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('User')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;
}
