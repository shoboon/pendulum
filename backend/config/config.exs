# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :pendulum, PendulumWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "l6IXL618AVC5OnkWs7FSerAg7CTLjXDL2pjC8WSxEtsgEhLGHOfXxYIYc3/UnajA",
  render_errors: [view: PendulumWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Pendulum.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
