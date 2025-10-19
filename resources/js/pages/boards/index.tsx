import { show } from '@/actions/App/Http/Controllers/BoardController';
import { Board } from '@/types';
import { Link } from '@inertiajs/react';

function Index({ boards }: { boards: Array<Board> }) {
  const renderedBoardsItems = boards.map((board) => (
    <Link href={show(board.id)} key={board.id}>
      <li className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 shadow hover:bg-gray-100">{board.name}</li>
    </Link>
  ));
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ul className="flex max-w-4/3 flex-wrap items-center gap-4">{renderedBoardsItems}</ul>
    </div>
  );
}

export default Index;
