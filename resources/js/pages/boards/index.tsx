import { Board } from '@/types';

function Index({ boards }: { boards: Array<Board> }) {
  const renderedBoardsItems = boards.map((board) => <li key={board.id}>{board.name}</li>);
  return (
    <div>
      <h1>Boards</h1>
      <ul>{renderedBoardsItems}</ul>
    </div>
  );
}

export default Index;
