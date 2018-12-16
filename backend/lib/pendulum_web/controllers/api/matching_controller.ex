defmodule PendulumWeb.Api.MatchingController do
  @moduledoc """
    マッチング処理
  """

  use PendulumWeb, :controller

  @status_waiting "waiting"
  @status_admission "admission"
  @status_exited "exited"

  @debug_admission_ticket "dc8be706-c9da-4c5d-af9b-42c7b8121435"

  @doc """
    整理券を発行する
  """
  def index(conn, _params), do: json conn, create_numbered_ticket()

  @doc """
    マッチング状況を取得する
  """
  def show(conn, numbered_ticket) do
    json conn, %{
      status: @status_admission,
      numberedTicket: numbered_ticket,

      # test用に固定化する
      #      admissionTicket: UUID.uuid4(),
      admissionTicket: @debug_admission_ticket,

      waitedBy: "2018-12-01T09:00:00",
    }
  end

  defp create_numbered_ticket() do
    %{numberedTicket: UUID.uuid4()}
  end

  defp create_admission_ticket() do
    %{admissionTicket: UUID.uuid4()}
  end

end
