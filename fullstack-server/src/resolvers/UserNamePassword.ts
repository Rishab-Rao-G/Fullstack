import { InputType, Field } from "type-graphql";

@InputType()
export class UserNamePassword {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
