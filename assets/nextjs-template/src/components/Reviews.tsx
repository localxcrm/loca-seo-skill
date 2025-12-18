// src/components/Reviews.tsx
import config from '../../site.config';

interface Review {
  author: string;
  rating: number;
  text: string;
  date?: string;
  source?: 'google' | 'yelp' | 'facebook';
}

interface ReviewsProps {
  reviews?: Review[];
  title?: string;
  showAggregateRating?: boolean;
  showReviewLinks?: boolean;
  limit?: number;
  className?: string;
}

export default function Reviews({
  reviews = [],
  title = "What Our Customers Say",
  showAggregateRating = true,
  showReviewLinks = true,
  limit = 6,
  className = '',
}: ReviewsProps) {
  const aggregate = config.reviews?.aggregate;
  const displayReviews = reviews.slice(0, limit);

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const sourceIcons: Record<string, string> = {
    google: '🔷',
    yelp: '🔴',
    facebook: '🔵',
  };

  return (
    <section className={`reviews ${className}`}>
      {/* Header with aggregate rating */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        
        {showAggregateRating && aggregate && aggregate.totalReviews > 0 && (
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-primary">
                {aggregate.averageRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(aggregate.averageRating)} />
            </div>
            <span className="text-gray-500">
              Based on {aggregate.totalReviews} reviews
            </span>
          </div>
        )}
      </div>

      {/* Reviews grid */}
      {displayReviews.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.rating} />
                {review.source && (
                  <span className="text-sm" title={review.source}>
                    {sourceIcons[review.source]}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-4">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">
                  — {review.author}
                </span>
                {review.date && (
                  <span className="text-gray-500">{review.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Placeholder when no reviews provided
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            See what our customers are saying about us!
          </p>
        </div>
      )}

      {/* Review platform links */}
      {showReviewLinks && (
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {config.reviews?.google?.url && (
            <a
              href={config.reviews.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>🔷</span>
              <span>Google Reviews</span>
              {config.reviews.google.rating > 0 && (
                <span className="font-semibold">{config.reviews.google.rating} ★</span>
              )}
            </a>
          )}
          
          {config.reviews?.yelp?.url && (
            <a
              href={config.reviews.yelp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>🔴</span>
              <span>Yelp Reviews</span>
              {config.reviews.yelp.rating > 0 && (
                <span className="font-semibold">{config.reviews.yelp.rating} ★</span>
              )}
            </a>
          )}
          
          {config.reviews?.facebook?.url && (
            <a
              href={config.reviews.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>🔵</span>
              <span>Facebook Reviews</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
}

// Compact review badge for headers/footers
export function ReviewBadge({ className = '' }: { className?: string }) {
  const aggregate = config.reviews?.aggregate;
  
  if (!aggregate || aggregate.totalReviews === 0) return null;

  return (
    <div className={`review-badge inline-flex items-center gap-2 ${className}`}>
      <span className="text-yellow-400">★</span>
      <span className="font-semibold">{aggregate.averageRating.toFixed(1)}</span>
      <span className="text-gray-500 text-sm">
        ({aggregate.totalReviews} reviews)
      </span>
    </div>
  );
}
