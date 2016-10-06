Rails.application.routes.draw do
  root 'homepage#show'

  get ':user_slug', to: 'users#show', as: :user

  namespace :api do
    namespace :v1, defaults: {format: :json}  do
      post "/lessons",                      to: "lessons#create"
      get "/lessons/:id",                   to: "lessons#show"
      get "/lessons/find_by/:date",         to: "lessons#find_lesson_by_date"
      get "/lessons/add_assignee/:github_id", to: "lessons#add_assignee"
      get "/lessons/assignee/:id",          to: "lessons#assignee"
      get "/lessons",                       to: "lessons#index"
    end
  end

  get '/add_assignees', to: "api/v1/lessons#update"
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
