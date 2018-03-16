Rails.application.routes.draw do
  get '/', to: 'home#index'

  resources :documents
  resources :users
  resources :permissions
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
