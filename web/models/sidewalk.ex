defmodule SidewalkChalk.Sidewalk do
  use SidewalkChalk.Web, :model

  @derive {Poison.Encoder, only: [:name, :colors]}
  schema "sidewalks" do
    field :name, :string
    field :colors, {:array, :string}
    timestamps
  end

  @required_fields ~w(name)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> build_colors
    |> cast(params, @required_fields, @optional_fields)
  end

  defp build_colors(changeset) do
    if is_nil changeset.id do
      colors = Enum.map(0..(50 * 50 - 1), fn _ -> "#000000" end)
      %{changeset | colors: colors}
    else
      changeset
    end
  end
end
