Rails.application.routes.draw do
  root 'homepage#show'

  resources :users, only: [:show, :index]

  namespace :api do
    namespace :v1, defaults: {format: :json}  do
      post "/lessons", to: "lessons#create"
      get "/lessons/:id", to: "lessons#show"
    end
  end

  get '/create_lesson', to: "lessons#create"
  get '/add_assignees', to: "lessons#update"
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
