import type { Card } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TrashIcon from './icons/TrashIcon';

type CardProps = {
  card: Card;
};

export default function Card({ card }: CardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: 'card-' + card.id,
    data: {
      type: 'card',
      card: card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        className="flex h-16 w-full items-center justify-between rounded-md border-4 border-gray-900 bg-gray-800 p-4 opacity-50"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ></div>
    );
  }

  return (
    <div
      className="flex h-16 w-full items-center justify-between rounded-md border-4 border-gray-900 bg-gray-800 p-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        <p className="cursor-pointer pb-1 font-bold">{card.name}</p>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-md p-2 hover:bg-gray-950">
        <TrashIcon />
      </button>
    </div>
  );
}
