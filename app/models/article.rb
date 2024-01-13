class Article < ApplicationRecord
  scope :filter_by_query, -> (query) { where('content ILIKE ?', "%#{query}%") }
end
