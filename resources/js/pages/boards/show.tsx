import Card from '@/components/Card';
import ColumnContainer from '@/components/ColumnContainer';
import PlusIcon from '@/components/icons/PlusIcon';
import BoardLayout from '@/layouts/board-layout';
import { Board, Card as CardType, Container } from '@/types';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type BoardWithContainersAndCards = Board & {
  containers: (Container & {
    cards: CardType[];
  })[];
};

type ContainerWithCards = Container & {
  cards: CardType[];
};

type ShowProps = {
  board: BoardWithContainersAndCards;
};

function Show({ board }: ShowProps) {
  const [containers, setContainers] = useState<ContainerWithCards[]>(board.containers);
  const [cards, setCards] = useState<CardType[]>(board.containers.flatMap((c) => c.cards));
  const [activeContainer, setActiveContainer] = useState<ContainerWithCards | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const containerIds = useMemo(() => containers.map((el) => 'container-' + el.id), [containers]);

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === 'column_container') {
      setActiveCard(null);
      setActiveContainer(e.active.data.current?.container);
    }

    if (e.active.data.current?.type === 'card') {
      setActiveContainer(null);
      setActiveCard(e.active.data.current.card);
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const isActiveCard = active.data.current?.type === 'card';
    const isOverCard = over.data.current?.type === 'card';
    const isOverContainer = over.data.current?.type === 'column_container';

    console.log({ isActiveCard, isOverCard, isOverContainer });

    if (!isActiveCard) return;
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) {
      setActiveContainer(null);
      setActiveCard(null);
      return;
    }

    console.log({ active, over });

    // Handle container reordering
    if (active.data.current?.type === 'column_container') {
      if (active.id !== over.id) {
        setContainers((prev) => {
          const activeIndex = prev.findIndex((el) => 'container-' + el.id === active.id);
          const overIndex = prev.findIndex((el) => 'container-' + el.id === over.id);

          if (activeIndex === -1 || overIndex === -1) return prev;

          const newContainers = [...prev];
          const [movedContainer] = newContainers.splice(activeIndex, 1);
          newContainers.splice(overIndex, 0, movedContainer);

          router.post(
            `/boards/${board.id}/containers/reorder`,
            {
              containers: newContainers.map((container, index) => ({
                id: container.id,
                position: index,
              })),
            },
            {
              onError: () => {
                setContainers(prev);
              },
            },
          );

          return newContainers;
        });
      }
    }

    setActiveContainer(null);
  };

  return (
    <BoardLayout>
      <div className="m-auto flex min-h-screen w-full items-start gap-2 overflow-x-auto overflow-y-hidden p-6">
        <div className="border border-gray-900 p-4">
          <p>Chat Box</p>
        </div>
        <div className="border border-gray-800 p-4">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <SortableContext items={containerIds}>
                  {containers.map((container) => (
                    <ColumnContainer key={container.id} container={container} />
                  ))}
                </SortableContext>
              </div>
              <button className="flex h-16 w-80 cursor-pointer items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 p-4 ring-rose-500 hover:ring-1">
                <PlusIcon /> Add Column
              </button>
            </div>
            {createPortal(
              <DragOverlay>
                {activeContainer ? <ColumnContainer container={activeContainer} /> : null}
                {activeCard ? <Card card={activeCard} /> : null}
              </DragOverlay>,
              document.body,
            )}
          </DndContext>
        </div>
      </div>
    </BoardLayout>
  );
}

export default Show;
