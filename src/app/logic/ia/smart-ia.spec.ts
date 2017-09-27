import { SmartIA } from './smart-ia';
import { Card } from '../cards';

const SCORE_MODAL = 10;

describe('Class smartIA', () => {
  let smartIA: SmartIA;
  let board: Array<Array<Card>>;
  let card: Card;

  beforeEach(() => {
    smartIA = new SmartIA('test-o');
  });

  afterEach(() => {
    smartIA = null;
  });

  it('should have name test-o', () => {
    expect(smartIA.getName()).toEqual('test-o');
  });

  it('should get proper score on empty board', () => {
    board = [
      [Card.getEmptyCard(), Card.getEmptyCard()],
      [Card.getEmptyCard(), Card.getEmptyCard()],
    ];
    card = new Card().deserialize({values: [1,2,3,4]});
    let score =
      1 / (SCORE_MODAL + card.values.left) +
      1 / (SCORE_MODAL + card.values.top) +
      1 / (SCORE_MODAL + card.values.right) +
      1 / (SCORE_MODAL + card.values.bottom);
    expect(smartIA.getScore(board, {x: 1, y: 1}, card)).toEqual(score);
  });

  it('should take the card on Board', () => {
    board = [
      [Card.getEmptyCard(), Card.getEmptyCard()],
      [Card.getEmptyCard(), new Card().deserialize({type: 'test', values: [1,1,1,1]})],
    ];
    card = new Card().deserialize({values: [2,3,4,5]});
    let score =
      1 / (SCORE_MODAL + card.values.left) +
      1 / (SCORE_MODAL + card.values.top) +
      1 / (SCORE_MODAL + card.values.right) +
      1 + 1 / (SCORE_MODAL + Math.abs(card.values.bottom - board[1][1].values.top));
    expect(smartIA.getScore(board, {x: 1, y: 0}, card)).toEqual(score);
  });
});
