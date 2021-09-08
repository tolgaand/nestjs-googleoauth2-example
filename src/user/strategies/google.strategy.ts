import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserDto } from '../dto/create-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURI,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;
    const email = emails[0].value;

    const newUser = plainToClass(CreateUserDto, {
      email,
      name: name.givenName,
      surname: name.familyName,
    });

    const foundedUser = await this.userService.findOne({ email });

    if (foundedUser) return done(null, foundedUser);
    else {
      const savedUser = await this.userService.create(newUser);
      return done(null, savedUser);
    }
  }
}
