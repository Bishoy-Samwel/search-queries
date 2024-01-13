class SearchesController < ApplicationController
  def index
  end

  def create
    query_value = params.dig(:query)

    larger_queries = Search.larger_queries(query_value)
    if larger_queries.empty?
      Search.create(query: query_value)
      smaller_queries = Search.smaller_queries(query_value)
      smaller_queries.each do |record|
        record.destroy if record.query.length < query_value.length
      end
    end
  end

  def update
  end
end
