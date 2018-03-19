class MakeDocumentTitleRequired < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:documents, :title, false)
  end
end
