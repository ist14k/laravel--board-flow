import ColumnContainer from '@/components/ColumnContainer';
import PlusIcon from '@/components/icons/PlusIcon';
import BoardLayout from '@/layouts/board-layout';
import { Board, Card, Container } from '@/types';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type BoardWithContainersAndCards = Board & {
  containers: (Container & {
    cards: Card[];
  })[];
};

type ContainerWithCards = Container & {
  cards: Card[];
};

type ShowProps = {
  board: BoardWithContainersAndCards;
};

function Show({ board }: ShowProps) {
  const [containers, setContainers] = useState<ContainerWithCards[]>(board.containers);
  const [activeContainer, setActiveContainer] = useState<ContainerWithCards | null>(null);
  const containerIds = useMemo(() => containers.map((el) => el.id), [containers]);

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === 'column_container') {
      setActiveContainer(e.active.data.current.container);
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setContainers((prev) => {
      const activeIndex = prev.findIndex((el) => el.id === active.id);
      const overIndex = prev.findIndex((el) => el.id === over.id);

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
  };

  return (
    <BoardLayout>
      <div className="m-auto flex min-h-screen w-full items-start overflow-x-auto overflow-y-hidden p-10">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
          {createPortal(<DragOverlay>{activeContainer ? <ColumnContainer container={activeContainer} /> : null}</DragOverlay>, document.body)}
        </DndContext>
      </div>
    </BoardLayout>
  );
}

export default Show;
