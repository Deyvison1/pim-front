export class User {
  constructor(
    public id?: number,
    public login?: string,
    public senha?: string,
    public admin?: string,
    public token?: string
  ) {}
}
