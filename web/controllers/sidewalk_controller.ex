defmodule SidewalkChalk.SidewalkController do
  use SidewalkChalk.Web, :controller

  alias SidewalkChalk.Sidewalk

  plug :scrub_params, "sidewalk" when action in [:create, :update]

  def index(conn, _params) do
    sidewalks = Repo.all(Sidewalk)
    render(conn, "index.html", sidewalks: sidewalks)
  end

  def new(conn, _params) do
    changeset = Sidewalk.changeset(%Sidewalk{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"sidewalk" => sidewalk_params}) do
    changeset = Sidewalk.changeset(%Sidewalk{}, sidewalk_params)

    case Repo.insert(changeset) do
      {:ok, _sidewalk} ->
        conn
        |> put_flash(:info, "Sidewalk created successfully.")
        |> redirect(to: sidewalk_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    sidewalk = Repo.get!(Sidewalk, id)
    render(conn, "show.html", sidewalk: sidewalk)
  end

  def edit(conn, %{"id" => id}) do
    sidewalk = Repo.get!(Sidewalk, id)
    changeset = Sidewalk.changeset(sidewalk)
    render(conn, "edit.html", sidewalk: sidewalk, changeset: changeset)
  end

  def update(conn, %{"id" => id, "sidewalk" => sidewalk_params}) do
    sidewalk = Repo.get!(Sidewalk, id)
    changeset = Sidewalk.changeset(sidewalk, sidewalk_params)

    case Repo.update(changeset) do
      {:ok, sidewalk} ->
        conn
        |> put_flash(:info, "Sidewalk updated successfully.")
        |> redirect(to: sidewalk_path(conn, :show, sidewalk))
      {:error, changeset} ->
        render(conn, "edit.html", sidewalk: sidewalk, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    sidewalk = Repo.get!(Sidewalk, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(sidewalk)

    conn
    |> put_flash(:info, "Sidewalk deleted successfully.")
    |> redirect(to: sidewalk_path(conn, :index))
  end
end
