'use client';

import { type ErrorImageProps } from '../model/Image.types';

export function ErrorImage({
  message = '이미지를 표시할 수 없습니다',
  className = 'absolute inset-0 flex flex-col items-center justify-center bg-gray-100/90',
  iconClassName = 'h-8 w-8 text-gray-400',
  messageClassName = 'text-sm text-gray-500',
}: ErrorImageProps) {
  return (
    <div className={className}>
      <div className="mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClassName}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className={messageClassName}>{message}</p>
    </div>
  );
}
