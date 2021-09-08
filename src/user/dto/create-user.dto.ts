import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  public name: string;

  @Expose()
  public surname: string;

  @Expose()
  public email: string;
}
