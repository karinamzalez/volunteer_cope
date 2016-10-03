Rails.application.routes.draw do
  root 'homepage#show'

  get ':user_slug', to: 'users#show', as: :user

  namespace :api do
    namespace :v1, defaults: {format: :json}  do
      post "/lessons", to: "lessons#create"
      get "/lessons/:id", to: "lessons#show"
      get "/lessons", to: "lessons#index"
    end
  end

  get '/create_lesson', to: "lessons#create"
  get '/add_assignees', to: "lessons#update"
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
