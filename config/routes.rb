Rails.application.routes.draw do
  root 'homepage#show'

  resources :users, only: [:show, :index]

  get '/create_lesson', to: "lessons#create"
  get '/add_assignees', to: "lessons#update"
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
