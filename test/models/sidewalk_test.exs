defmodule SidewalkChalk.SidewalkTest do
  use SidewalkChalk.ModelCase

  alias SidewalkChalk.Sidewalk

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Sidewalk.changeset(%Sidewalk{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Sidewalk.changeset(%Sidewalk{}, @invalid_attrs)
    refute changeset.valid?
  end
end
