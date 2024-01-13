class Search < ApplicationRecord
  scope :larger_queries, -> (query_value) { find_by_sql(["SELECT * FROM searches WHERE query ILIKE '%' || ? || '%'", query_value])
  }
  scope :smaller_queries, -> (query_value) { find_by_sql(["SELECT * FROM searches WHERE ? ILIKE '%' || query || '%'", query_value]) }
end
