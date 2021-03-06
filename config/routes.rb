Rails.application.routes.draw do
  get '/', to: 'home#index'
  get '/dapp', to: 'home#dapp'

  resources :documents
  resources :permissions

  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show', as: 'user'
  get '/documents/:id/permissions/new', to: 'permissions#new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
