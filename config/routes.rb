Rails.application.routes.draw do
  resources :searches do
    member do
      post :create
    end
    collection do
      get :index, :update
    end
  end
  resources :articles, trailing_slash: true do
    collection do
      post :search
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "articles#index"


end
