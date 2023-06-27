export class BoardEntity {
  id?: number;
  name?: string;
  score?: number;
  address?: string;
}

export class BoardView extends BoardEntity {
  rank?: number;
}
