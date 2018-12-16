defmodule PendulumWeb.Api.BattleController do
  @moduledoc """
    ゲームロジック
  """

  @status_ready "ready"
  @status_started "started"
  @status_ended "ended"

  @debug_admission_ticket "dc8be706-c9da-4c5d-af9b-42c7b8121435"

  use PendulumWeb, :controller

  def show(conn, %{"admission_ticket" => @debug_admission_ticket}) do
    json conn, %{
      status: @status_started,
      admissionTicket: @debug_admission_ticket
    }
  end
  def show(conn, %{"admission_ticket" => admission_ticket}) do
   json conn, %{
     status: @status_ended,
     admissionTicket: admission_ticket
   }
  end

end
