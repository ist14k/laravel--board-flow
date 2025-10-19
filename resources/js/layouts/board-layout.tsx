import { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
};

function BoardLayout({ children }: PageProps) {
  return (
    <div className="relative">
      {children}
      <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 shadow-2xl">
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm transition-colors hover:bg-gray-600"
          title="Chat"
        >
          💬
        </button>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm transition-colors hover:bg-gray-600"
          title="Board"
        >
          📋
        </button>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm transition-colors hover:bg-gray-600"
          title="Activity"
        >
          🔔
        </button>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm transition-colors hover:bg-gray-600"
          title="Switch Board"
        >
          🔄
        </button>
      </div>
    </div>
  );
}

export default BoardLayout;
