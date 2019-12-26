export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public imageUrl: string,
    public status: string,
    public roles: string[] = [],
    public enabled: boolean
  ) {}
}
