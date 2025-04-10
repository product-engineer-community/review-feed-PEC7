import Image from 'next/image';
import { NaverReview } from '../model/types';

interface ReviewDetailProps {
  review: NaverReview;
}

export const ReviewDetail = ({ review }: ReviewDetailProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center mb-3">
        {review.profileImage && (
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <span>{review.profileImage}</span>
            {/* <Image
              src={review.profileImage}
              alt={`${review.nickname} profile`}
              width={40}
              height={40}
              className="object-cover"
            /> */}
          </div>
        )}
        <div>
          <div className="font-medium">{review.nickname}</div>
          <div className="text-xs text-gray-500">
            {review.reviewStats.join(' · ')}
          </div>
        </div>
      </div>

      {review.reviewPhotos && review.reviewPhotos.length > 0 && (
        <div className="mb-3 flex overflow-x-auto gap-2">
          {review.reviewPhotos.map((photo, index) => (
            <div key={index} className="min-w-[120px] h-[120px] relative">
                <span>{photo}</span>
              {/* <Image
                src={photo}
                alt={`Review photo ${index + 1}`}
                fill
                className="object-cover rounded-md"
              /> */}
            </div>
          ))}
        </div>
      )}

      {review.reviewBody && (
        <div className="mb-3 text-sm">{review.reviewBody}</div>
      )}

      {review.visitKeywords && review.visitKeywords.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {review.visitKeywords.map((keyword, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {review.emojiTags && review.emojiTags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {review.emojiTags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-xs text-gray-500 flex justify-between mt-2">
        <div>{review.visitDate}</div>
        <div>{review.visitVerificationType.join(' · ')}</div>
      </div>
    </div>
  );
}; 