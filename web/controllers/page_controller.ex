defmodule SidewalkChalk.PageController do
  use SidewalkChalk.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
