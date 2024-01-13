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

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.update("searches",
                              partial: "searches/searches_list",
                              locals: { searches: Search.all })
        ]
      end
    end

  end

  def update
  end
end
