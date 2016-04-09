defmodule SidewalkChalk.Repo.Migrations.CreateSidewalk do
  use Ecto.Migration

  def change do
    create table(:sidewalks) do
      add :name, :string
      add :colors, {:array, :string}
      timestamps
    end

  end
end
