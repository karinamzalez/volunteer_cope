Rails.application.routes.draw do
  root 'users#index'

  resources :users, only: :show
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
