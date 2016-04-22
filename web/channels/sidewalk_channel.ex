defmodule SidewalkChalk.SidewalkChannel do
  use Phoenix.Channel
  alias SidewalkChalk.Repo
  alias SidewalkChalk.Sidewalk

  def join("sidewalks:" <> sidewalk_id, _params, socket) do
    if !is_nil(Repo.get(Sidewalk, sidewalk_id)) do
      {:ok, socket}
    else
      {:error, %{reason: "not found"}}
    end
  end

  def handle_in("update_color", %{"position" => position, "color" => color}, socket) do
    broadcast! socket, "update_color", %{position: position, color: color}
    {:noreply, socket}
  end
end
