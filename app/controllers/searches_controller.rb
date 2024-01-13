class SearchesController < ApplicationController
  def index
  end

  def create
    Search.create(query: params.dig(:query))
  end

  def update
  end
end
