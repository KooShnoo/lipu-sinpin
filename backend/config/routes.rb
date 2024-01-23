# rubocop:disable Style/SymbolArray
Rails.application.routes.draw do
  root "static_pages#frontend_index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api, defaults: { format: :json } do
    get :analytics, to: 'analytics#show'
    
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:show, :create, :update, :destroy]
    resources :friends, only: [:create, :destroy]
  end

  get '*path', to: "static_pages#frontend_other"
end
# rubocop:enable Style/SymbolArray
