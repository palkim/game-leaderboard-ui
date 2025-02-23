"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableCellProps = {
  id: string;
};

const DraggableCell: React.FC<DraggableCellProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform) || undefined,
    transition: transition || undefined,
    touchAction: "none", // Prevents scrolling while dragging
  };

  return (
    <div
      ref={setNodeRef}
      className="p-3 bg-[#1b172a] text-gray-300 cursor-grab flex items-start justify-start rounded-md shadow-md ml-5 w-full"
      style={style}
      {...listeners}
      {...attributes}
    >
      {id} <span className="ml-2 text-gray-500">⋮⋮</span>
    </div>
  );
};

const HeaderGroup = ({ items, setItems }: { items: string[]; setItems: (items: string[]) => void }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 }, // Delay prevents accidental drags
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id as string);
    const newIndex = items.indexOf(over.id as string);
    if (oldIndex !== -1 && newIndex !== -1) {
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-2 pl-3 pr-3 bg-[#1b172a] rounded-md shadow-lg justify-between">
          {items.map((id) => (
            <DraggableCell key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default HeaderGroup;
