ExUnit.start

Mix.Task.run "ecto.create", ~w(-r SidewalkChalk.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r SidewalkChalk.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(SidewalkChalk.Repo)

