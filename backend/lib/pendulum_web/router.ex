defmodule PendulumWeb.Router do
  use PendulumWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PendulumWeb do
    pipe_through :api
  end

  scope "/api", PendulumWeb do
    pipe_through :api

    get "/numbered_ticket", Api.MatchingController, :index

    get "/waiting_users/:numbered_ticket", Api.MatchingController, :show

    get "/battle_rooms/:admission_ticket", Api.BattleController, :show
  end

end
