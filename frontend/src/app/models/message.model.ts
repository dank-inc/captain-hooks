type Params = {
  id: number;
  body: string;
  user_id: number;
  created_at: number;
  updated_at: number;
};

export class Message {
  public id: number;
  public body: string;
  public user_id: number;
  public created_at: number;
  public updated_at: number;

  constructor({ id, body, user_id, created_at, updated_at }: Params) {
    this.id = id;
    this.body = body;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
