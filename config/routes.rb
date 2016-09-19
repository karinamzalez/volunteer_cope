Rails.application.routes.draw do
  root 'homepage#show'

  resources :users, only: [:show, :index]
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
