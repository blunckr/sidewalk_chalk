defmodule SidewalkChalk.SidewalkControllerTest do
  use SidewalkChalk.ConnCase

  alias SidewalkChalk.Sidewalk
  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, sidewalk_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing sidewalks"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, sidewalk_path(conn, :new)
    assert html_response(conn, 200) =~ "New sidewalk"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, sidewalk_path(conn, :create), sidewalk: @valid_attrs
    assert redirected_to(conn) == sidewalk_path(conn, :index)
    assert Repo.get_by(Sidewalk, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, sidewalk_path(conn, :create), sidewalk: @invalid_attrs
    assert html_response(conn, 200) =~ "New sidewalk"
  end

  test "shows chosen resource", %{conn: conn} do
    sidewalk = Repo.insert! %Sidewalk{}
    conn = get conn, sidewalk_path(conn, :show, sidewalk)
    assert html_response(conn, 200) =~ "Show sidewalk"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, sidewalk_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    sidewalk = Repo.insert! %Sidewalk{}
    conn = get conn, sidewalk_path(conn, :edit, sidewalk)
    assert html_response(conn, 200) =~ "Edit sidewalk"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    sidewalk = Repo.insert! %Sidewalk{}
    conn = put conn, sidewalk_path(conn, :update, sidewalk), sidewalk: @valid_attrs
    assert redirected_to(conn) == sidewalk_path(conn, :show, sidewalk)
    assert Repo.get_by(Sidewalk, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    sidewalk = Repo.insert! %Sidewalk{}
    conn = put conn, sidewalk_path(conn, :update, sidewalk), sidewalk: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit sidewalk"
  end

  test "deletes chosen resource", %{conn: conn} do
    sidewalk = Repo.insert! %Sidewalk{}
    conn = delete conn, sidewalk_path(conn, :delete, sidewalk)
    assert redirected_to(conn) == sidewalk_path(conn, :index)
    refute Repo.get(Sidewalk, sidewalk.id)
  end
end
