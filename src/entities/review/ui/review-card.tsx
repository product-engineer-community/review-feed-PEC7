import { NaverReview } from '../model/types';

export const ReviewCard = ({ review }: { review: NaverReview }) => {
  return (
    <div className="rounded-xl border p-5 shadow-sm bg-white space-y-4">
      <div className="flex items-center space-x-3">
        <img src={review.profileImage} alt="프로필" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{review.nickname}</div>
          <div className="text-xs text-gray-500">{review.stats.join(', ')}</div>
        </div>
      </div>
      <p className="text-sm text-gray-800">{review.body}</p>
    </div>
  );
};
