type Params = {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
  admin: boolean;
};

export class User {
  public id: number;
  public name: string;
  public created_at: number;
  public updated_at: number;
  public admin: boolean;

  constructor({ id, name, created_at, updated_at, admin }: Params) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.admin = admin;
  }
}
