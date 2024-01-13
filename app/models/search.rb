class Search < ApplicationRecord
  scope :larger_queries, -> (query_value) { find_by_sql(["SELECT * FROM searches WHERE query ILIKE '%' || ? || '%'", query_value])
  }
  scope :smaller_queries, -> (query_value) { find_by_sql(["SELECT * FROM searches WHERE ? ILIKE '%' || query || '%'", query_value]) }

  scope :query_count_by_ip_address, -> () { group(:query).select('query, COUNT(DISTINCT ip_address) as user_count') }

  def self.create_and_cleanup(query_value, ip_address)
    larger_queries = Search.larger_queries(query_value)
    if larger_queries.empty?
      Search.create(query: query_value, ip_address: ip_address)
      smaller_queries = Search.smaller_queries(query_value)
      smaller_queries.each do |record|
        record.destroy if record.query.length < query_value.length
      end
    end
  end

end
