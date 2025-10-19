import type { Card, Container } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TrashIcon from './icons/TrashIcon';

type ContainerWithCards = Container & {
  cards: Card[];
};

type ColumnContainerProps = {
  container: ContainerWithCards;
};

export default function ColumnContainer({ container }: ColumnContainerProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: container.id,
    data: {
      type: 'column_container',
      container: container,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div className="flex h-[500px] min-h-[500px] w-88 flex-col rounded-md bg-gray-900 opacity-40" ref={setNodeRef} style={style}>
        <div
          className="flex h-16 w-full items-center justify-between rounded-md border-4 border-gray-900 bg-gray-950 p-4"
          {...attributes}
          {...listeners}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-gray-900 px-2 py-1">
              <p className="text-sm">{container.cards.length}</p>
            </div>
            <p className="pb-1 font-bold">{container.name}</p>
          </div>
          <button className="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-800">
            <TrashIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[500px] min-h-[500px] w-88 flex-col rounded-md bg-gray-900" ref={setNodeRef} style={style}>
      <div
        className="flex h-16 w-full items-center justify-between rounded-md border-4 border-gray-900 bg-gray-950 p-4"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-gray-900 px-2 py-1">
            <p className="text-sm">{container.cards.length}</p>
          </div>
          <p className="pb-1 font-bold">{container.name}</p>
        </div>
        <button className="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-800">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
