class SearchesController < ApplicationController
  def create
    ip_address = request.remote_ip
    Search.create_and_cleanup(params.dig(:query), ip_address)
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.update("searches",
                              partial: "searches/searches_list",
                              locals: { searches: Search.all.where(ip_address: ip_address) })
        ]
      end
    end
  end
end
