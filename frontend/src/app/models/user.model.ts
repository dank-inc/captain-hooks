type Params = {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
};

export class User {
  public id: number;
  public name: string;
  public created_at: number;
  public updated_at: number;

  constructor({ id, name, created_at, updated_at }: Params) {
    this.id = id;
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
