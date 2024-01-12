Rails.application.routes.draw do
  get 'searches/index'
  get 'searches/create'
  get 'searches/update'
  resources :articles, trailing_slash: true do
    collection do
      post :search
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "articles#index"


end
