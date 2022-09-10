import { Skeleton, Card } from 'antd';
import React from 'react';

function LoadingCard({ count }) {
  function cards() {
    let total_cards = [];
    for (let i = 0; i < count; i++) {
      total_cards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return total_cards;
  }

  return <div className="row">{cards()}</div>;
}

export default LoadingCard;
