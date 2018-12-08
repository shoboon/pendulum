defmodule PendulumWeb.Router do
  use PendulumWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PendulumWeb do
    pipe_through :api
  end
end
