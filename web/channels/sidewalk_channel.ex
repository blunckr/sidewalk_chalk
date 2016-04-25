defmodule SidewalkChalk.SidewalkChannel do
  use Phoenix.Channel
  alias SidewalkChalk.Repo
  alias SidewalkChalk.Sidewalk

  def join("sidewalks:" <> sidewalk_id, _params, socket) do
    if !is_nil(Repo.get(Sidewalk, sidewalk_id)) do
      {:ok, assign(socket, :sidewalk_id, sidewalk_id)}
    else
      {:error, %{reason: "not found"}}
    end
  end

  def handle_in("update_color", %{"position" => position, "color" => color}, socket) do
    broadcast! socket, "update_color", %{position: position, color: color}

    sidewalk = Repo.get!(Sidewalk, socket.assigns.sidewalk_id);
    changeset = Sidewalk.changeset(sidewalk, %{colors: List.replace_at(sidewalk.colors, position, color)});

    Repo.update(changeset)
    {:noreply, socket}

  end
end
