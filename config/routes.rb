Rails.application.routes.draw do
  root 'homepage#show'

  get ':user_slug', to: 'users#show', as: :user

  namespace :api do
    namespace :v1, defaults: {format: :json}  do
      post "/lessons",                      to: "lessons#create"
      get "/lessons/:id",                   to: "lessons#show"
      get "/lessons/find_by/:date",         to: "lessons#find_lesson_by_date"
      get "/lessons/add_assignee/:github_id", to: "lessons#add_assignee"
      get "/lessons/remove/:github_id",     to: "lessons#remove_assignee"
      get "/lessons/assignee/:id",          to: "lessons#assignee"
      get "/lessons/assignees/:id",         to: "lessons#assignees"
      get "/lessons",                       to: "lessons#index"
      get "/all_lessons",                   to: "lessons#all_lessons"
      get "/lessons/user_volunteered/:id",  to: "lessons#user_volunteered"
    end
  end

  get '/add_assignees', to: "api/v1/lessons#update"
  get '/auth/github', as: :github_login
  get '/auth/github/callback', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
